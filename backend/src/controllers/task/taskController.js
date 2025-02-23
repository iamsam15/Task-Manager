import { json } from "express";
import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    console.log("Error creating Task: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User not Found" });
    }
    const tasks = await TaskModel.find({ user: userId });

    return res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error getting tasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "provide a task id" });
    }
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in getting task: ", error);
    return res.status(500).json({ message: error.message });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;

    if (!id) {
      return res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not Found!" });
    }

    // check if the user is the onwer of the task
    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    //update the task
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("error updating user: ", error);
    return res.status(500).json(error.message);
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!id) {
      return res.status(404).josn({ message: "Task not found" });
    }
    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await TaskModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error deleting task: ", error);
    return res.status(500).json(error.message);
  }
});
