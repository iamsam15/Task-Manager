import { useTasks } from "@/context/taskContext";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();
  return (
    <div className="h-[16rem] px-5 py-4 flex flex-col gap-4 shadow-md bg-white rounded-xl border border-gray-300">
      <div>
        <h4 className="font-semibold text-xl text-gray-900">{task.title}</h4>
        <p className="text-gray-700 text-sm mt-1">{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-gray-500 text-sm">{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div className="flex items-center gap-4 text-gray-500 text-[1.2rem]">
          <button
            className={`transition duration-300 ${
              task.completed ? "text-yellow-500" : "text-gray-400"
            } hover:text-yellow-600`}>
            {star}
          </button>
          <button
            className="text-blue-500 hover:text-blue-600 transition duration-300"
            onClick={() => {
              getTask(task._id);
              openModalForEdit(task);
            }}>
            {edit}
          </button>
          <button className="text-red-500 hover:text-red-600 transition duration-300">
            {trash}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
