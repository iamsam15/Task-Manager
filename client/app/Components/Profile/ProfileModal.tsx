"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import useOutsideDetect from "@/hooks/useOutsideDetect";
import { badge, check, github, mail } from "@/utils/Icons";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

function ProfileModal() {
  const ref = React.useRef(null);
  const { closeModal } = useTasks();
  const { updateUser, user, handlerUserInput, userState, changePassword } =
    useUserContext();
  useOutsideDetect({
    ref,
    callback: () => {
      closeModal();
    },
  });

  const { name, email, photo } = user;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePassword =
    (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
      if (type === "old") {
        setOldPassword(e.target.value);
      } else {
        setNewPassword(e.target.value);
      }
    };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        ref={ref}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 relative">
        <div className="absolute inset-x-0 top-0 h-20 bg-gray-100 rounded-t-xl"></div>

        <div className="mt-4 relative flex flex-wrap justify-between items-center">
          <div className="relative inline-block">
            <Image
              src={photo}
              alt="profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xs text-white">{check}</span>
            </div>
          </div>
          <div className="self-end flex flex-wrap gap-2">
            <button className="flex items-center gap-2 border border-gray-300 rounded-md py-1 px-3 text-xs font-medium text-gray-700">
              {github} Github
            </button>
            <button className="flex items-center gap-2 border border-gray-300 rounded-md py-1 px-3 text-xs font-medium text-gray-700">
              {check} Verified
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-semibold">{name}</h1>
          <p className="text-gray-500">{email}</p>
        </div>

        <form
          className="mt-4 border-t pt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(e, {
              name: userState.name,
              email: userState.email,
            });
          }}>
          <div className="grid grid-cols-[150px_1fr] items-center">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              onChange={(e) => handlerUserInput("name")(e)}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => handlerUserInput("email")(e)}
                className="w-full py-2 pl-10 pr-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                {mail}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="oldPassword"
                className="text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={handlePassword("old")}
                className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePassword("new")}
                className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 border-t pt-4">
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-red-500 hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
