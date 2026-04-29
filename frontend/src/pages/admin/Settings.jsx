import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { FaUser, FaLock, FaBell, FaPalette } from "react-icons/fa";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    console.log("PROFILE SAVED:", profile);
  };

  const handleChangePassword = () => {
    console.log("PASSWORD UPDATED:", password);
  };

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">

        {/* HEADER */}
        <div className="mb-6 p-5 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your account and preferences
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PROFILE */}
          <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">

            <div className="flex items-center gap-2 mb-4">
              <FaUser />
              <h2 className="font-bold">Profile</h2>
            </div>

            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Full Name"
              className="w-full p-2 mb-3 bg-gray-100 dark:bg-gray-800 rounded"
            />

            <input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Email"
              className="w-full p-2 mb-3 bg-gray-100 dark:bg-gray-800 rounded"
            />

            <button
              onClick={handleSaveProfile}
              className="bg-yellow-500 text-black px-4 py-2 rounded"
            >
              Save Profile
            </button>
          </div>

          {/* PASSWORD */}
          <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">

            <div className="flex items-center gap-2 mb-4">
              <FaLock />
              <h2 className="font-bold">Password</h2>
            </div>

            <input
              type="password"
              name="current"
              value={password.current}
              onChange={handlePasswordChange}
              placeholder="Current Password"
              className="w-full p-2 mb-3 bg-gray-100 dark:bg-gray-800 rounded"
            />

            <input
              type="password"
              name="new"
              value={password.new}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="w-full p-2 mb-3 bg-gray-100 dark:bg-gray-800 rounded"
            />

            <button
              onClick={handleChangePassword}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Update Password
            </button>
          </div>

          {/* NOTIFICATIONS */}
          <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">

            <div className="flex items-center gap-2 mb-4">
              <FaBell />
              <h2 className="font-bold">Notifications</h2>
            </div>

            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" />
              Email Notifications
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Push Notifications
            </label>

          </div>

          {/* APPEARANCE */}
          <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">

            <div className="flex items-center gap-2 mb-4">
              <FaPalette />
              <h2 className="font-bold">Appearance</h2>
            </div>

            <button className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded mr-2">
              Light
            </button>

            <button className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded">
              Dark
            </button>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default Settings;