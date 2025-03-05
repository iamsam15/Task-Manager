"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext.js";
import Image from "next/image";
import React from "react";

function Profile() {
  const { user } = useUserContext();
  const { tasks, activeTasks, completedTasks, openProfileModal } = useTasks();
  return (
    <div className="m-6">
      <div
        className="px-4 py-4 flex items-center gap-4 bg-white shadow-md rounded-2xl
        hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer border border-gray-300"
        onClick={openProfileModal}>
        <div>
          <Image
            src={user?.photo}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-full border-2 border-gray-300"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            <span className="text-gray-600">Hello, </span>
            <span className="font-bold text-gray-900">{user?.name}</span>
          </h1>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="text-gray-600 bg-white shadow-md p-4 rounded-xl">
          <p className="text-sm">Total Tasks</p>
          <p className="flex items-center gap-2 text-4xl font-bold text-gray-900">
            <span className="h-6 w-1 bg-purple-500 rounded-full"></span>
            {tasks.length}
          </p>
        </div>
        <div className="text-gray-600 bg-white shadow-md p-4 rounded-xl">
          <p className="text-sm">In Progress</p>
          <p className="flex items-center gap-2 text-4xl font-bold text-gray-900">
            <span className="h-6 w-1 bg-teal-500 rounded-full"></span>
            {activeTasks.length}
          </p>
        </div>
        <div className="text-gray-600 bg-white shadow-md p-4 rounded-xl">
          <p className="text-sm">Active Tasks</p>
          <p className="flex items-center gap-2 text-4xl font-bold text-gray-900">
            <span className="h-6 w-1 bg-orange-500 rounded-full"></span>
            {activeTasks.length}
          </p>
        </div>
        <div className="text-gray-600 bg-white shadow-md p-4 rounded-xl">
          <p className="text-sm">Completed</p>
          <p className="flex items-center gap-2 text-4xl font-bold text-gray-900">
            <span className="h-6 w-1 bg-green-500 rounded-full"></span>
            {completedTasks.length}
          </p>
        </div>
      </div>

      <h3 className="mt-8 text-lg font-medium text-gray-800">Activity</h3>
    </div>
  );
}

export default Profile;
