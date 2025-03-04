"use client";
import { useTasks } from "@/context/taskContext.js";
import useOutsideDetect from "@/hooks/useOutsideDetect";
import { ActivitySquare, Target } from "lucide-react";
import React, { useEffect } from "react";

function Modal() {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
  } = useTasks();
  const ref = React.useRef(null);

  useOutsideDetect({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask")(activeTask);
    }
  }, [modalMode, activeTask]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalMode === "edit") {
      updateTask(task);
    } else if (modalMode === "add") {
      createTask(task);
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <form
        className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 space-y-5"
        onSubmit={handleSubmit}
        ref={ref}>
        <h2 className="text-xl font-semibold text-gray-800">
          {modalMode === "edit" ? "Edit Task" : "Create Task"}
        </h2>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Title</label>
          <input
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="text"
            placeholder="Task Title"
            name="title"
            value={task.title}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Description</label>
          <textarea
            className="w-full p-3 border rounded-lg bg-gray-100 resize-none focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Task Description"
            rows={4}
            name="description"
            value={task.description}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">
            Select Priority
          </label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-100 cursor-pointer focus:ring-2 focus:ring-indigo-400 outline-none"
            name="priority"
            value={task.priority}
            onChange={(e) => handleInput("priority")(e)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Due Date</label>
          <input
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">
            Task Completed
          </label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-100 cursor-pointer focus:ring-2 focus:ring-indigo-400 outline-none"
            name="completed"
            value={task.completed ? "true" : "false"}
            onChange={(e) => handleInput("completed")(e)}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ease-in-out ${
            modalMode === "edit"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}>
          {modalMode === "edit" ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default Modal;
