import React, { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter();

  const [user, setUser] = useState({});
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

  //get user logged in status
  const userLoginStatus = async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true,
      });

      //coerce the string to boolean
      loggedIn = !!res.data;
      setLoading(false);

      if (!loggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  };

  // logout the user
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });

      toast.success("User logged out successfully");

      router.push("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error("error.response.data.message");
    }
  };

  // get User details
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true,
      });

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  //update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true, // send cookies to the server
      });

      // update the user state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setUserState((prevState) => ({
        ...prevState,
        bio: res.data.bio, // Immediately update the UI
      }));
      console.log(user);
      toast.success("User updated successfully");

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  //Email verification
  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-email`,
        {},
        { withCredentials: true }
      );

      toast.success("Verification email sent successfully");
      setLoading(false);
    } catch (error) {}
  };

  //verify user/email
  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = axios.post(
        `${serverUrl}/api/v1/verify-user/${token}`,
        {},
        { withCredentials: true }
      );

      toast.success("User Verified successfully");
      await getUser();
      setLoading(false);
      // redirect user to the home page
      router.push("/");
    } catch (error) {
      console.log("Error Verfiying User: ", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // forgot password email \
  const forgotPasswordEmail = async (email) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/forgot-password`,
        {
          email,
        },
        { withCredentials: true }
      );

      toast.success("Mail sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("error sending mail: ", error);
      toast.error(error.response.data.message);
      setLoading(false);
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

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isloggedIn = await userLoginStatus();

      if (isloggedIn) {
        getUser();
      }
    };
    loginStatusGetUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        logoutUser,
        userLoginStatus,
        user,
        updateUser,
        setUserState,
        emailVerification,
        verifyUser,
        forgotPasswordEmail,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
