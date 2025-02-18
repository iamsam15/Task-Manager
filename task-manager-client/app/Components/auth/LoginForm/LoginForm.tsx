"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="relative m-[2rem] px-10 py-14 rounded-xl bg-white w-full max-w-[520px] shadow-md">
      <div className="relative z-10">
        <h1 className="mb-3 text-center text-2xl font-semibold text-gray-800">
          Login to your Account
        </h1>
        <p className="mb-6 px-[2rem] text-center text-gray-600 text-sm">
          Login Now. Don't have an Account?{" "}
          <a
            href="/register"
            className="font-bold text-[#3498db] hover:text-[blue] transition-all duration-300">
            Register Here
          </a>
        </p>

        <div className="mt-4 flex flex-col">
          <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
            className="px-4 py-3 border-[1.5px] border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3498db] text-gray-800"
            placeholder="johndoe@gmail.com"
          />
        </div>

        <div className="relative mt-4 flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            className="px-4 py-3 border-[1.5px] border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3498db] text-gray-800"
            placeholder="***************"
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[22px] text-gray-500 opacity-70">
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <a
            href="/forgot-password"
            className="font-bold text-[#3498db] text-[14px] hover:text-[blue] transition-all duration-300">
            Forgot password?
          </a>
        </div>
        <div className="flex">
          <button
            type="submit"
            disabled={!email || !password}
            onClick={loginUser}
            className="mt-6 flex-1 px-4 py-3 font-semibold bg-[#3498db] text-white rounded-lg hover:bg-[blue] transition-all">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
