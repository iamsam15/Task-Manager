import { useTasks } from "@/context/taskContext.js";
import React from "react";

function Filters() {
  const { priority, setPriority } = useTasks();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const priorities = ["All", "Low", "Medium", "High"];

  return (
    <div className="relative py-2 px-2 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-lg">
      <span
        className="absolute left-[5px] bg-red-100 rounded-full transition-transform duration-300 ease-in-out"
        style={{
          width: `calc(100% / 4 - 10px)`,
          height: "calc(100% - 10px)",
          top: "50%",
          transform: `translate(calc(${activeIndex * 100}% + ${
            activeIndex * 10
          }px), -50%)`,
          transition: "transform 300ms cubic-bezier(.95,.03,1,1)",
        }}></span>

      {priorities.map((priority, index) => (
        <button
          key={index}
          className={`relative flex-1 text-center py-2 px-4 text-sm font-medium rounded-full z-10 transition-all duration-200 ${
            activeIndex === index ? "text-red-600" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setPriority(priority.toLowerCase());
          }}>
          {priority}
        </button>
      ))}
    </div>
  );
}

export default Filters;
