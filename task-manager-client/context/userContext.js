import React, { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  //register user
  const registerUser = async (e) => {
    e.preventDefault();
    console.log("Sending request with:", { name, email, password });
    console.log("register user function called ");
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  // Login User
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User Logged in successfully");

      // clear the from
      setUserState({
        email: "",
        password: "",
      });

      // push user to the dashborard page
      router.push("/");
    } catch (error) {
      console.log("Error Logging in User", error);
      toast.error(error.response.data.message);
    }
  };

  // dynamic from handler
  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <UserContext.Provider
      value={{ registerUser, userState, handlerUserInput, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
