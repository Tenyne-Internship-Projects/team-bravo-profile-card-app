import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft, User, Mail, Lock, CheckCircle } from 'lucide-react';
import photo from '../assets/photo.png';              

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  /* ---------- For password Strenght ---------- */
  const passwordChecks = useMemo(
    () => ({
      length: form.password.length >= 8,
      number: /\d/.test(form.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
    }),
    [form.password]
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify-email');
  };

  const handleOAuth = (provider) => {
    if (provider === 'google') {
      window.location.href = 'https://accounts.google.com/';      
    } else {
      window.location.href = 'https://github.com/your‑username'; 
    }
  };


  return (
    <div className="relative min-h-screen flex items-start justify-between bg-white">
      {/* back arrow */}
      <button
        onClick={() => navigate('/')}
        className="absolute left-4 top-4 flex items-center text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      
      <div className="flex w-full max-w-8xl bg-[#f9f7fb] rounded-[24px] overflow-hidden shadow-lg">
        {/* left – image */}
        <img
          src={photo}
          alt="freelancer"
          className="hidden md:block object-cover max-w-[620px] h-[680px] ml-12 "
          style={{ borderRadius: '24px 0 0 24px' }}
        />

        {/* right – sign‑up form */}
        <div className="flex-4 flex flex-col justify-center items-center p-8 md:p-12 space-y-6">
          <h1 className="text-3xl font-semibold">Create your account</h1>

          {/* Auth buttons */}
          <div className="w-full space-y-3">
            <button
              onClick={() => handleOAuth('google')}
              className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-md py-2 hover:bg-gray-100"
            >
              <FcGoogle className="w-5 h-5 text-[#4285F4]" />
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuth('github')}
              className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-md py-2 hover:bg-gray-100"
            >
              <FaGithub className="w-5 h-5 text-gray-800" />
              Continue with GitHub
            </button>
          </div>

          {/* divider */}
          <div className="flex items-center gap-2 w-full">
            <span className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500 whitespace-nowrap">Or continue with</span>
            <span className="flex-1 h-px bg-gray-300" />
          </div>
         
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#4d0892]/50"
              />
            </div>

            {/* email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#4d0892]/50"
              />
            </div>

            {/* password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#4d0892]/50"
              />
            </div>

            {/*  password strenght */}
            <div className="space-y-1 text-sm">
              <p
                className={`flex items-center gap-2 ${
                  passwordChecks.length ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 ${
                    passwordChecks.length ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
                password must contain at least 8 characters
              </p>
              <p
                className={`flex items-center gap-2 ${
                  passwordChecks.number ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 ${
                    passwordChecks.number ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
                password must contain a number
              </p>
              <p
                className={`flex items-center gap-2 ${
                  passwordChecks.special ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 ${
                    passwordChecks.special ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
                password contain a special character
              </p>
            </div>

            {/* submit */}
            <button
              type="submit"
              className="w-full bg-[#4d0892] hover:bg-[#3d0672] text-white rounded-md py-3 font-medium"
            >
              Sign up
            </button>
          </form>

          {/* sign‑in */}
          <p className="text-sm text-center">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="text-[#4d0892] hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;