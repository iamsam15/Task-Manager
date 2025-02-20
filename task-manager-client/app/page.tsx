"use client";

import { useState } from "react";
import { useUserContext } from "../context/userContext.js";
import useRedirect from "@/hooks/useUserRedirect";

export default function Home() {
  useRedirect("/login");
  const {
    logoutUser,
    user,
    handlerUserInput,
    updateUser,
    userState,
    emailVerification,
  } = useUserContext();
  const { name, photo, isVerified, bio } = user;

  const [isOpen, setIsopen] = useState(false);
  //function
  const myToggle = () => {
    setIsopen(!isOpen);
  };

  return (
    <main className="py-[2rem] mx-[10rem]">
      <header className="flex justify-between">
        <h1 className="text-[2rem] font-bold">
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
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              onClick={emailVerification}>
              Verify Email
            </button>
          )}

          <button
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
            onClick={logoutUser}>
            Logout
          </button>
        </div>
      </header>
      <section>
        <p className="text-[#999] text-[2rem]">{bio}</p>
        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200">
            {" "}
            Update Bio
          </button>
        </h1>

        {isOpen && (
          <form className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-300 max-w-[40%] w-full">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-gray-600 font-medium">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                onChange={(e) => handlerUserInput("bio")(e)}></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200">
              Update Bio
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
