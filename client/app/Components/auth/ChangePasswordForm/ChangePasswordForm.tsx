"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";

function ChangePasswordForm() {
  const { changePassword } = useUserContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const currentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const newPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const togglePassword = (e: any) => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    changePassword(currentPassword, newPassword);
    // clear input

    setCurrentPassword("");
    setNewPassword("");
  };
  return (
    <div className="mt-9 flex w-full max-w-lg justify-center items-center p-6 bg-gray-100">
      <form className="w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Change Password
        </h1>

        {/* Password Field */}
        <div className="relative mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1">
            Current Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={currentPasswordChange}
            id="password"
            name="password"
            placeholder="**********"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-10 text-lg text-gray-600">
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="relative mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-medium mb-1">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={newPasswordChange}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="**********"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-10 text-lg text-gray-600">
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
