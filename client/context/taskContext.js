import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useUserContext } from "./userContext.js";
import toast from "react-hot-toast";

const TasksContext = createContext();
const serverUrl = "https://task-manager-xox2.onrender.com/api/v1";

export const TasksProvider = ({ children }) => {
  const { user } = useUserContext();
  const userId = user?._id;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false,
  });
  const [priority, setPriority] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [modalMode, setModalMode] = useState();
  const [profileModal, setProfileModal] = useState();

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
      completed: false,
    });
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
      completed: false,
    });
  };

  // Fetch all tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error);
    }
    setLoading(false);
  };

  // get task
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);

      setTask(response.data);
    } catch (error) {
      console.log("Error getting task", error);
    }
    setLoading(false);
  };

  const createTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, task);

      console.log("Task created", res.data);

      setTasks([...tasks, res.data]);

      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error creating task", error);
    }
    setLoading(false);
  };

  const updateTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);

      // update the task in the tasks array
      const newTasks = tasks.map((tsk) => {
        return tsk._id === res.data._id ? res.data : tsk;
      });

      toast.success("Task updated successfully");

      setTasks(newTasks);
    } catch (error) {
      console.log("Error updating task", error);
    }
    setLoading(false);
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);

      // remove the task from the tasks array
      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);

      setTasks(newTasks);
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  //get completed tasks
  const completedTasks = tasks.filter((task) => task.completed);

  // get pending tasks
  const activeTasks = tasks.filter((task) => !task.completed);

  // Fetch tasks when userId changes
  useEffect(() => {
    if (userId) {
      getTasks();
    }
  }, [userId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        completedTasks,
        activeTasks,
        openProfileModal,
        profileModal,
      }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};
