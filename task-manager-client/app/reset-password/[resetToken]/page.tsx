"use client";

import { useUserContext } from "@/context/userContext";
import React, { use, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: {
    resetToken: string;
  };
}

function page({ params }: { params: Promise<{ resetToken: string }> }) {
  const resolvedParams = React.use(params);
  const resetToken = resolvedParams.resetToken;

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword } = useUserContext();
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfrimPassword = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log("password: ", password);
    resetPassword(resetToken, password);
  };

  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <main className="auth-page flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Reset Password
        </h1>

        {/* Password Field */}
        <div className="relative mb-4">
          <label htmlFor="password" className="block text-gray-600 font-medium">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            id="password"
            name="password"
            placeholder="**********"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3498db] text-gray-800"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-10 text-xl text-gray-500 opacity-70">
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="relative mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-600 font-medium">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfrimPassword}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="**********"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3498db] text-gray-800"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-10 text-xl text-gray-500 opacity-70">
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
          className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white font-semibold py-3 rounded-lg transition duration-300">
          Reset Password
        </button>
      </form>
    </main>
  );
}

export default page;
