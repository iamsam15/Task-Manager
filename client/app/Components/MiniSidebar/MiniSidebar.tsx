"use client";

import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/iconDeleteAll";
import IconFileCheck from "@/public/icons/iconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/iconStopwatch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MiniSidebar() {
  const pathName = usePathname();

  const getStrokeColor = (link: string) => {
    return link === pathName ? "#0D1B9EFF" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <div className="w-20 flex flex-col bg-white shadow-md  py-4">
      <div className="flex items-center justify-center h-20">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
      </div>
      <div className="mt-6 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-8">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                href={item.link}
                className="hover:scale-110 transition-transform">
                {item.icon}
              </Link>
              <span className="absolute top-1/2 -translate-y-1/2 left-10 text-xs text-white bg-teal-500 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
        <div className="mb-6">
          <button className="w-12 h-12 flex justify-center items-center border-2 border-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all">
            <IconDeleteAll strokeColor="#eb4e31" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;
