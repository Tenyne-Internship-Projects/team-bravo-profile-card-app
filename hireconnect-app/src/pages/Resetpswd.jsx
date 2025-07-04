import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kconnect.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Resetpswd = () => {
  const [state, setState] = useState('unreset');
  const [email, setEmail] = useState('');
  const { backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning('Please enter your email');
      return;
    }

    try {
      
      await axios.post(`${backendUrl}/api/auth/reset-password`, { email });

      setState('sent');
      toast.success('Reset link sent! Check your email.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4">
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/5 sm:w-1/5 cursor-pointer" />
      </div>

      <div className="flex flex-col items-center mt-10 w-full max-w-md bg-white shadow-md rounded-md p-6">
        <h1 className="font-medium text-[#4A008F] text-2xl sm:text-3xl text-center">
          {state === 'unreset' ? 'Reset Password' : 'Check Your Inbox'}
        </h1>

        <p className="text-[16px] text-[#14122A] text-center my-3 font-medium">
          {state === 'unreset'
            ? 'Enter the email address associated with your account and we’ll send you a link to reset your password.'
            : 'We’ve sent a password reset link to your email. If you don’t see it in your inbox, please check your spam or junk folder.'}
        </p>

        {state === 'unreset' ? (
          <form onSubmit={handleSubmit} className="w-full mt-4">
            <div className="flex flex-col">
              <label className="mb-1 text-[#302B63] text-[17px] font-medium">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 placeholder:text-[#616161] placeholder:font-medium outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#302B63] text-white font-bold py-2 rounded-md text-lg hover:scale-105 transition-transform cursor-pointer mt-6"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="w-full mt-4">
            <p className="text-[16px] text-[#14122A] text-center my-3 font-medium">
              This link will expire in 15–30 minutes for security.
            </p>

            <button
              onClick={() => {
                setState('unreset');
                setEmail('');
              }}
              className="w-full bg-[#302B63] text-white font-bold py-2 rounded-md text-lg hover:scale-105 transition-transform cursor-pointer mt-6"
            >
              Send Another Link
            </button>
          </div>
        )}

        <p className="text-sm text-[#302B63] text-center cursor-pointer mt-6">
          {state === 'unreset' ? (
            <>
              Remembered your password?{' '}
              <span onClick={() => navigate('/login')} className="underline">
                Sign in here
              </span>
            </>
          ) : (
            <>
              Return to{' '}
              <span onClick={() => navigate('/login')} className="underline">
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};



export default Resetpswd;
