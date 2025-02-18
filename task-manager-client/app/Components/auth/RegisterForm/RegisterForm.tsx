"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="mx-auto mt-10 max-w-md rounded-xl bg-white/90 p-8 shadow-2xl text-gray-900 backdrop-blur-lg">
      <h1 className="mb-2 text-center text-xl font-semibold text-gray-900">
        Register for an Account
      </h1>
      <p className="mb-6 text-center text-sm text-gray-600">
        Create an account. Already have one?{" "}
        <a
          href="/login"
          className="font-semibold text-blue-500 transition hover:text-blue-700">
          Login here
        </a>
      </p>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring focus:ring-blue-300"
          placeholder="John Doe"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring focus:ring-blue-300"
          placeholder="johndoe@gmail.com"
        />
      </div>

      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 focus:ring focus:ring-blue-300"
            placeholder="********"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="mb-4 text-right">
        <a
          href="/forgot-password"
          className="text-sm font-semibold text-blue-500 transition hover:text-blue-700">
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white font-semibold transition hover:bg-blue-600">
        Register Now
      </button>
    </form>
  );
}

export default RegisterForm;
