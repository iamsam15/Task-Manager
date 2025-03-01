"use client";
import { useUserContext } from "@/context/userContext.js";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { name } = user;
  const userId = user._id;
  return (
    <header className="px-8 py-4 w-full flex items-center justify-between bg-white shadow-sm ">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}` : "Welcome to Task-Manager"}
        </h1>
        <p className="text-sm text-gray-600">
          {userId ? (
            <>
              You have <span className="font-bold text-blue-600">5</span> active
              tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className="flex items-center gap-20">
        <button className="px-6 py-2 bg-orange-text-orange-600 text-white rounded-full hover:bg-green-600 transition-all">
          Create a new task
        </button>
        <div className="flex gap-3 items-center">
          <Link
            href="https://github.com/iamsam15/Task-Manager"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-orange-600 rounded-full flex items-center justify-center text-xl border border-gray-300 shadow-sm hover:shadow-md">
            {github}
          </Link>
          <Link
            href="https://github.com/iamsam15/Task-Manager"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-orange-600 rounded-full flex items-center justify-center text-xl border border-gray-300 shadow-sm hover:shadow-md">
            {profile}
          </Link>
          <Link
            href="https://github.com/iamsam15/Task-Manager"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-orange-600 rounded-full flex items-center justify-center text-xl border border-gray-300 shadow-sm hover:shadow-md">
            {moon}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
