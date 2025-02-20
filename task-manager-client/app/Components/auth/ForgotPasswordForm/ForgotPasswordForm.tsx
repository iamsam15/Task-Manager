"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";

function ForgotPasswordForm() {
  const { forgotPasswordEmail } = useUserContext();
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    forgotPasswordEmail(email);
    setEmail("");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Reset Your Password
        </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            placeholder="johndoe@gmail.com"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-[70%] bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
