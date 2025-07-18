import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import {
  fetchClientProfile,
  updateClientProfile,
  uploadClientLogo,
} from "../api/ClientApi";
import "../styles/EditCLProfile.css";

const EditClientProfile = () => {
  const { userData, getUserData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    website: "",
    industry: "",
    location: "",
    description: "",
  });

  const [step, setStep] = useState(1);
  const logoInputRef = useRef();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchClientProfile();
        setForm({
          company_name: profile.company_name || "",
          website: profile.website || "",
          industry: profile.industry || "",
          location: profile.location || "",
          description: profile.description || "",
        });
      } catch (err) {
        toast.error("Failed to load client profile");
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadClientLogo(file);
      toast.success("Company logo uploaded");
      await getUserData();
    } catch (err) {
      toast.error("Logo upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClientProfile(form);
      toast.success("Profile updated");
      await getUserData();
      navigate("/client-dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  const handleStepOneContinue = () => {
    if (!form.company_name || !form.industry) {
      toast.error("Please fill required fields");
      return;
    }
    setStep(2);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="edit-profile-title">Edit Company Profile</h2>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="profile-image-section vertical">
              <img
                src={
                  userData?.client?.logo
                    ? `${backendUrl}/${userData.client.logo.replace(
                        /^\/+/,
                        ""
                      )}`
                    : "/assets/company.png"
                }
                alt="Company Logo"
                className="profile-avatar"
              />
              <div className="upload-actions">
                <button
                  onClick={() => logoInputRef.current.click()}
                  className="upload-btn"
                  type="button"
                >
                  Upload Company Logo
                </button>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleLogoUpload}
                />
              </div>
            </div>

            <form
              className="edit-profile-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                required
              />
              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="Industry"
                required
              />
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Company Website"
              />
              <button
                type="button"
                className="edit-profile-submit"
                onClick={handleStepOneContinue}
              >
                Continue
              </button>
            </form>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location (e.g., Lagos, Nigeria)"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Company Description"
              rows={4}
              required
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                className="upload-btn"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit" className="header-btn">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditClientProfile;
