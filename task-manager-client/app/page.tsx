"use client";

import { useUserContext } from "../context/userContext.js";

export default function Home() {
  const user = useUserContext();
  const name = "saumil";
  const { logoutUser } = useUserContext();
  console.log(user);
  return (
    <main className="py-[2rem] mx-[10rem]">
      <header className="flex items-center justify-center">
        <h1 className="text-[2rem]">
          Welcome <span className="text-red-600">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img src="" alt="" />
          <button
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
            onClick={logoutUser}>
            Logout
          </button>
        </div>
      </header>
    </main>
  );
}
