import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";

function Sidebar() {
  return (
    <div className="w-[20rem] mt-[5.25rem] h-[calc(100%-5.25rem)] fixed right-0 top-0 bg-white flex flex-col overflow-y-auto ">
      <Profile />
      <div className="mt-4 mx-6 flex-grow">
        <RadialChart />
      </div>
      <button className="my-4  mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#cc3535] transition duration-200 ease-in-out">
        Sign Out
      </button>
    </div>
  );
}

export default Sidebar;
