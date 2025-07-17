import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import logo from '../assets/kconnect.png';

const ConfirmReset = () => {
  const { backendUrl } = useContext(AppContext);
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.warning('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${backendUrl}/api/auth/confirm-reset`, {
        token,
        password,
      });

      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Reset failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4">
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/5 sm:w-1/6 cursor-pointer" />
      </div>

      <div className="flex flex-col items-center mt-14 w-full max-w-md bg-white shadow-md rounded-md p-6">
        <h1 className="font-medium text-[#4A008F] text-2xl sm:text-3xl text-center mb-2">
          Set New Password
        </h1>

        <form onSubmit={handleSubmit} className="w-full mt-4 space-y-4">
          <div>
            <label className="text-[#302B63] font-medium">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>

          <div>
            <label className="text-[#302B63] font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#302B63] text-white font-bold py-2 rounded-md text-lg transition-transform ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmReset;
