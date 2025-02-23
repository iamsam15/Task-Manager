"use client";

import { useState } from "react";
import { useUserContext } from "../context/userContext.js";
import useRedirect from "@/hooks/useUserRedirect";
import ChangePasswordForm from "./Components/auth/ChangePasswordForm/ChangePasswordForm";

export default function Home() {
  useRedirect("/login");
  const {
    logoutUser,
    user,
    handlerUserInput,
    updateUser,
    userState,
    emailVerification,
    allUsers,
    deleteUser,
  } = useUserContext();
  const { name, photo, isVerified, bio } = user;

  const [isOpen, setIsopen] = useState(false);
  //function
  const myToggle = () => {
    setIsopen(!isOpen);
  };

  return (
    <main className="py-8 px-10 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome <span className="text-red-600">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img
            src={photo}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-md"
          />
          {!isVerified && (
            <button
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={emailVerification}>
              Verify Email
            </button>
          )}
          <button
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={logoutUser}>
            Logout
          </button>
        </div>
      </header>

      <section className="mb-6">
        <p className="text-gray-500 text-xl">{bio}</p>
        <button
          onClick={myToggle}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition">
          Update Bio
        </button>

        {isOpen && (
          <form className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-300 max-w-md">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-2 text-gray-600 font-medium">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                onChange={(e) => handlerUserInput("bio")(e)}></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition">
              Update Bio
            </button>
          </form>
        )}
      </section>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
        <div className="flex-1">
          <ul className="space-y-4">
            {allUsers.map((user: any) => (
              <li
                key={user._id}
                className="flex items-center gap-4 p-4 border rounded-lg shadow">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.bio}</p>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-3 py-1.5 mt-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200">
                    delete User
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
