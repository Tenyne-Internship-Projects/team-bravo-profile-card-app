import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { verifyOtp, resendOtp } from "../api/authApi";

import "../styles/EmailVerify.css";

const Emailverify = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userData, getUserData } = useContext(AppContext);

  const inputRefs = useRef([]);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [resendEmail, setResendEmail] = useState("");

  useEffect(() => {
    const savedExpireTime = localStorage.getItem("otp_expire_time");
    if (!savedExpireTime) return setTimer(0);

    const remaining = Math.max(
      Math.floor((Number(savedExpireTime) - Date.now()) / 1000),
      0
    );
    setTimer(remaining);

    const interval = setInterval(() => {
      const timeLeft = Math.floor(
        (Number(savedExpireTime) - Date.now()) / 1000
      );
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimer(0);
        localStorage.removeItem("otp_expire_time");
      } else {
        setTimer(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) navigate("/");
  }, [isLoggedIn, userData, navigate]);

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("user_email");
    if (userData?.email) {
      setVerificationEmail(userData.email);
      setResendEmail(userData.email);
    } else if (emailFromStorage) {
      setVerificationEmail(emailFromStorage);
      setResendEmail(emailFromStorage);
    }
  }, [userData]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const maskEmail = (email = "") => {
    const [user, domain] = email.split("@");
    return `${user.slice(0, 2)}***@${domain}`;
  };

  const clearInputs = () => inputRefs.current.forEach((el) => (el.value = ""));

  const handleInput = (e, i) => {
    const val = e.target.value;
    if (!/^[0-9]$/.test(val)) return (e.target.value = "");
    if (i < inputRefs.current.length - 1) inputRefs.current[i + 1].focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !e.target.value && i > 0)
      inputRefs.current[i - 1].focus();
  };

  const handlePaste = (e) => {
    const arr = e.clipboardData.getData("text").slice(0, 6).split("");
    arr.forEach(
      (c, i) => /^[0-9]$/.test(c) && (inputRefs.current[i].value = c)
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((el) => el.value).join("");

    if (otp.length < 6) return toast.warning("Please enter all 6 digits.");

    try {
      const data = await verifyOtp({
        email: verificationEmail.trim().toLowerCase(),
        otp: otp.trim(),
      });

      toast.success(data.message);
      clearInputs();
      await getUserData?.();
      navigate("/register");
    } catch (err) {
      toast.error(err.message || "Verification failed.");
    }
  };

  const startTimer = (duration = 60) => {
    const expireTime = Date.now() + duration * 1000;
    localStorage.setItem("otp_expire_time", expireTime.toString());
    setTimer(duration);

    const interval = setInterval(() => {
      const remaining = Math.floor((expireTime - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(interval);
        setTimer(0);
        localStorage.removeItem("otp_expire_time");
      } else {
        setTimer(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleResendOTP = async () => {
    if (!resendEmail) return toast.error("Please enter your email first.");

    try {
      setResendLoading(true);
      const data = await resendOtp(resendEmail);
      if (data.message?.toLowerCase().includes("already verified")) {
        toast.info("Your account is already verified. You can log in.");
        return;
      }
      toast.success(data.message);
      startTimer(60);
    } catch (err) {
      toast.error(err.message || "Error resending OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="emailverify-wrapper">
        <h1 className="emailverify-title">Please verify your email address</h1>
        <p className="emailverify-description">
          We've sent a verification code to{" "}
          <span>
            {verificationEmail ? maskEmail(verificationEmail) : "your email"}
          </span>
          . Please enter it below to continue.
        </p>

        <form onSubmit={onSubmitHandler} className="emailverify-form">
          <div className="space-y-2">
            <label htmlFor="email">Enter your email for verification</label>
            <input
              id="email"
              type="email"
              className="email-input"
              value={verificationEmail}
              onChange={(e) => setVerificationEmail(e.target.value)}
              required
            />
          </div>

          <div className="otp-box-container" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                required
                inputMode="numeric"
                ref={(el) => (inputRefs.current[i] = el)}
                onInput={(e) => handleInput(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="otp-input-box"
              />
            ))}
          </div>

          <button type="submit" className="auth-button">
            Verify Email
          </button>
        </form>

        <div className="mt-4">
          <input
            type="email"
            placeholder="Email to resend OTP"
            className="resend-email-input"
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
          />
        </div>

        <div className="emailverify-footer">
          <p>
            Didn’t receive a code?{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={timer > 0 || resendLoading}
            >
              {resendLoading
                ? "Resending…"
                : timer > 0
                ? `Resend in ${timer}s`
                : "Resend OTP"}
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Emailverify;
