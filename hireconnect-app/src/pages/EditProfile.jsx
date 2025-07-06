import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp, resendOtp } from "../api/authApi";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-fill email if passed from signup
  const prefilledEmail = location?.state?.email || "";
  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  // Handle OTP input
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Submit OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return toast.error("Enter all 6 digits");

    try {
      setLoading(true);
      await verifyOtp(code);
      toast.success("Email verified successfully");
      navigate("/signin");
    } catch (err) {
      toast.error(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!email) return toast.error("Please enter your email first");
    try {
      setLoading(true);
      await resendOtp(email);
      toast.success("OTP resent successfully");
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f7fb] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-6 space-y-4 text-center">
        <img src="/assets/kconnect.png" alt="Logo" className="w-20 mx-auto" />
        <h2 className="text-xl font-semibold text-[#4d0892]">Verify Email</h2>
        <p className="text-sm text-gray-600">
          Enter the 6-digit OTP sent to your email. It expires in{" "}
          <strong>20 minutes</strong>.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex justify-center gap-1 sm:gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base text-center border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#4d0892]"
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-[#4d0892] text-white py-2 px-4 rounded w-full font-semibold hover:bg-[#3c0577] transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-4 space-y-2 text-left">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to resend OTP"
            className="w-full px-3 py-2 border rounded border-gray-300"
          />
          <button
            onClick={handleResend}
            className="text-[#4d0892] font-medium hover:underline"
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
