import React, { useContext, useEffect, useRef, useState } from 'react';
import photo from '../assets/photo.png';      
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const verifyOTP = async (otp) =>
  new Promise((res) =>
    setTimeout(() => res({ success: otp === '000000', message: 'OTP verified' }), 600)
  );

const resendOTPRequest = async () =>
  new Promise((res) =>
    setTimeout(() => res({ success: true, message: 'OTP resent' }), 600)
  );
// -------------------------------------------------

const Emailverify = () => {       

  const navigate = useNavigate();
  const {isLoggedIn, userData, getUserData } =
    useContext(AppContext);

  const inputRefs = useRef([]);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    if (timer === 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  /* ---------------- helpers ---------------- */
  const maskEmail = (email = '') => {
    const [user, domain] = email.split('@');
    return `${user.slice(0, 2)}***@${domain}`;
  };

  const handleInput = (e, i) => {
    const val = e.target.value;
    if (!/^[0-9]$/.test(val)) {
      e.target.value = '';
      return;
    }
    if (i < inputRefs.current.length - 1) inputRefs.current[i + 1].focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !e.target.value && i > 0)
      inputRefs.current[i - 1].focus();
  };

  const handlePaste = (e) => {
    const arr = e.clipboardData.getData('text').slice(0, 6).split('');
    arr.forEach((c, i) => /^[0-9]$/.test(c) && (inputRefs.current[i].value = c));
  };

  const clearInputs = () => inputRefs.current.forEach((el) => (el.value = ''));

  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((el) => el.value).join('');

    // here is if no digits yet, open mailbox so user can fetch the code
    if (!otp) {
      window.open('https://mail.google.com', '_blank');
      return;
    }

    try {
      
      const data = await verifyOTP(otp); 

      if (data.success) {
        toast.success(data.message);
        clearInputs();
        await getUserData?.();
        navigate('/register');
      } else toast.error(data.message);
    } catch (err) {
      toast.error('Verification failed. Try again.');
    }
  };

  /* ---------------- resend OTP ---------------- */
  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
     
      const data = await resendOTPRequest();

      data.success ? toast.success(data.message) : toast.error(data.message);
      setTimer(60);
    } catch {
      toast.error('Error resending OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  /* ---------------- redirect if already verified ---------------- */
  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) navigate('/');
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-white min-h-screen px-4">
       <button
        onClick={() => navigate('/SignUp')}
        className="absolute left-4 top-4 flex items-center text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
             

      {/* ---------- photo ---------- */}
      <img
        src={photo}
        alt="Email verification illustration"
        className="w-full max-w-md object-cover rounded-lg shadow-md mb-6 mt-[-12px] lg:mb-4 lg:mr-8"
      />      

      {/* ---------- form ---------- */}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full sm:w-[80%] md:w-[50%] lg:w-[40%]"
      >
        
        <h1 className="font-bold text-[#302B63] text-2xl sm:text-3xl text-center mb-3">
          Please verify your email address
        </h1>

        <p className="text-base sm:text-lg text-[#747196] text-center mb-4">
         We’ve sent a verification code to your email address. Kindly check to get started.
          <span className="font-medium">
            {userData?.email ? maskEmail(userData.email) : 'your email'}
          </span>
        </p>

        <div
          className="flex justify-between gap-2 sm:gap-3 mb-4"
          onPaste={handlePaste}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              pattern="\d*"
              inputMode="numeric"
              required
              ref={(el) => (inputRefs.current[i] = el)}
              onInput={(e) => handleInput(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl rounded-md border border-gray-400 text-[#4d0892]"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-[#302B63] text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
        >
          Verify Email
        </button>

        {/* ---------- resend link ---------- */}
        <div className="mt-4 text-center">
          <p className="text-sm text-[#747196]">
            Didn’t receive code?{' '}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={timer > 0 || resendLoading}
              className="text-[#4d0892] font-medium underline disabled:opacity-50"
            >
              {resendLoading
                ? 'Resending…'
                : timer > 0
                ? `Resend in ${timer}s`
                : 'Resend OTP'}
            </button>
          </p>
        </div>

        {/* ----------Blur section--------- */}
        <div className="relative w-full lg:w-[564px] lg:shrink-2">
          <div
            className="
              absolute left-1/2 bottom-[-1rem] hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2
              rounded-full bg-gradient-to-br from-[#17022c]/50 to-[#4d0892]/10
              opacity-30 blur-3xl shadow-2xl
              lg:block
            "
          />
        </div>
      </form>
    </div>
  );
};

export default Emailverify;
