import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { logoutUser } from "../api/authApi";

const ProfileCard = () => {
  const { userData, setUserData, getUserData, setIsLoggedIn, backendUrl } =
    useContext(AppContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (useDummyData) {
        setUserData(dummyUser);
      } else if (!userData) {
        await getUserData();
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const profile = useDummyData
    ? dummyUser
    : {
        username: userData?.username || userData?.fullname || "John Doe",
        fullname: userData?.fullname || "John Doe",
        state: userData?.state || "Lagos",
        country: userData?.country || "Nigeria",
        about: userData?.about || "No bio provided.",
        image: userData?.image,
        skills: userData?.skills || [],
        tools: userData?.tools || [],
        email: userData?.email || "no-email@example.com",
        contact: userData?.contact || "Not provided",
        github: userData?.github || "",
        portfolio: userData?.portfolio || "",
      };

  const handleLogout = async () => {
    try {
      await logoutUser(); // POST with cookies
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUserData(null);
      toast.success("Logged out successfully");
      navigate("/signin");
    } catch (error) {
      toast.error(error?.message || "Logout failed");
    }
  };

  const handleEdit = () => navigate("/edit-profile");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-200">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-[#302B63] font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4 py-8">
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img
          src={logo}
          alt="KConnect Logo"
          className="w-1/5 sm:w-1/6 cursor-pointer"
        />
      </div>

      <motion.div
        className="w-full max-w-xl bg-white rounded-md shadow-md mt-16 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-[#302B63] h-[10em] px-6">
          <motion.div
            className="flex justify-end gap-3 pt-4"
            variants={itemVariants}
          >
            <button
              onClick={handleEdit}
              className="text-[#302B63] bg-white px-4 py-1 cursor-pointer text-sm"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-[#302B63] bg-white px-4 py-1  cursor-pointer text-sm"
            >
              Sign Out
            </button>
          </motion.div>
        </div>

        <div className="py-4 px-7">
          {/* Profile Image */}
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <div className="w-full mt-[-7em] h-[8.75rem]">
              <motion.img
                src={profile.image}
                alt="Profile"
                className="h-full w-[8.75rem] object-cover border-4 border-white rounded-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="">
              <h1 className="text-[#302B63] text-2xl font-semibold capitalize">
                {profile.fullname}
              </h1>
              <h2 className="text-[#302B63]">@{profile.username}</h2>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div variants={itemVariants}>
            <p className="text-gray-700 mt-2">{profile.about}</p>
            <p className="text-gray-600 text-[14px] mt-1">
              {profile.state}, {profile.country}
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold text-[#302B63] mt-4 mb-2">
              Contact Information
            </h3>
            <div className="flex flex-col gap-3">
              <p className="bg-[#302B63]/10 text-[#302B63] px-4 py-2 rounded-md text-sm">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <p className="bg-[#302B63]/10 text-[#302B63] px-4 py-2 rounded-md text-sm">
                <a href={`tel:${profile.contact}`}>{profile.contact}</a>
              </p>
              <p className="bg-[#302B63]/10 text-[#302B63] px-4 py-2 rounded-md text-sm">
                {" "}
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.portfolio}
                </a>
              </p>
              <p className="bg-[#302B63]/10 text-[#302B63] px-4 py-2 rounded-md text-sm">
                {" "}
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.github}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <div className="border rounded-xl my-4 p-4">
              <h3 className="text-lg font-bold text-[#302B63] mb-2">
                Main Skill Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#302B63]/10 text-[#302B63] text-[16px] px-8 py-2 font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-700">Not provided</span>
                )}
              </div>
            </div>

            {/* Tools */}
            <div className="border rounded-xl my-4 p-4">
              <h3 className="text-lg font-bold text-[#302B63] mb-2">
                Tools / Software
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.tools.length > 0 ? (
                  profile.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="bg-[#302B63]/10 text-[#302B63] text-[16px] px-8 py-2 font-medium"
                    >
                      {tool}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-700">Not provided</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
