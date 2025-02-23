"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

interface Props {
  params: {
    verificationToken: string;
  };
}

function page({ params }: { params: Promise<{ verificationToken: string }> }) {
  const resolvedParams = React.use(params);
  const verificationToken = resolvedParams.verificationToken;
  const { verifyUser } = useUserContext();
  return (
    <div className=" auth-page min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Verify Your Account
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to verify your account.
        </p>

        <button
          onClick={() => verifyUser(verificationToken)}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 w-full">
          Verify
        </button>
      </div>
    </div>
  );
}

export default page;
