"use client";
import useRedirect from "@/hooks/useUserRedirect";
import { useTasks } from "@/context/taskContext";

import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import { useEffect } from "react";
import Filters from "../Components/Filters/Filters";
import TaskItem from "../Components/TaskItem/TaskItem";
import { container, item } from "@/utils/animations";
import { motion } from "framer-motion";

function page() {
  useRedirect("/login");
  const { tasks, openModalForAdd, priority, setPriority, activeTasks } =
    useTasks();

  const filtered = filteredTasks(activeTasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);
  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Pending Tasks</h1>
        <Filters />
      </div>
      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible">
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
        hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}>
          Add Task
        </motion.button>
      </motion.div>
    </main>
  );
}

export default page;
