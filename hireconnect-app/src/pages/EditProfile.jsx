import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kconnect.png';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditProfile = () => {
  const {
    userData,
    setUserData,
    getUserData,
    backendUrl,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    contact: '',
    country: '',
    state: '',
    about: '',
    skills: '',
    tools: '',
    github: '',
    portfolio: '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  // Pre-fill form with user data
  useEffect(() => {
    if (userData) {
      setForm({
        username: userData.username || '',
        email: userData.email || '',
        contact: userData.contact || '',
        country: userData.country || '',
        state: userData.state || '',
        about: userData.about || '',
        skills: userData.skills?.join(', ') || '',
        tools: userData.tools?.join(', ') || '',
        github: userData.github || '',
        portfolio: userData.portfolio || '',
      });
      setPreview(userData.image || '');
    } else {
      getUserData();
    }
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.warning('Please upload a valid image');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['username', 'email', 'country', 'state', 'about'];
    for (const field of requiredFields) {
      if (!form[field]) {
        toast.error(`Please fill in the ${field} field`);
        return;
      }
    }

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      if (image) formData.append('image', image);

      const { data } = await axios.put(`${backendUrl}/api/user/edit-profile`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        toast.success('Profile updated successfully');
        await getUserData(); 
        navigate('/profile');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4">
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/5 sm:w-1/6 cursor-pointer" />
      </div>

      <div className="mt-24 w-full max-w-lg bg-white shadow-md rounded-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-[#302B63]">Edit Profile</h2>

        <div className="flex flex-col items-center">
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={preview || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="h-24 w-24 rounded-full border-2 border-[#302B63] object-cover"
            />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="text-sm text-[#302B63] mt-1">Click image to change</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Phone/Contact"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
          />

          <div className="flex gap-3">
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="flex-1 border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
              required
            />
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="flex-1 border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
              required
            />
          </div>

          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="About Me"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none h-24 resize-none"
            required
          />

          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skills (comma-separated)"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
          />

          <input
            type="text"
            name="tools"
            value={form.tools}
            onChange={handleChange}
            placeholder="Tools (comma-separated)"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
          />

          <input
            type="text"
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
          />

          <input
            type="text"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="Portfolio URL"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
          />

          <button
            type="submit"
            className="bg-[#302B63] text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
