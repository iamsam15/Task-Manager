import React, { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "https://task-manager-xox2.onrender.com";

  const router = useRouter();

  const [user, setUser] = useState({});
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  //register user
  const registerUser = async (e) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Login User
  const loginUser = async (e) => {
    setLoading(true);
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
      getUser();
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
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //get user logged in status
  const userLoginStatus = async () => {
    setLoading(true);
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true,
      });

      //coerce the string to boolean
      loggedIn = !!res.data;

      if (!loggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }

    return loggedIn;
  };

  // logout the user
  const logoutUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });

      toast.success("User logged out successfully");
      setUser({});
      router.push("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error("error.response.data.message");
    } finally {
      setLoading(false);
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
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
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
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
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
    } catch (error) {
      console.log("Error verifiying user: ", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
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

      // redirect user to the home page
      router.push("/");
    } catch (error) {
      console.log("Error Verfiying User: ", error);
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // forgot password email
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
    } catch (error) {
      console.log("error sending mail: ", error);
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //reset password
  const resetPassword = async (token, password) => {
    setLoading(true);
    console.log(token);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );

      toast.success("Passowrd Reset Successfully");

      //redirect to the login page
      router.push("/login");
    } catch (error) {
      console.log("Error resetting password: ", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);

    try {
      const res = await axios.patch(
        `${serverUrl}/api/v1/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );

      toast.success("Password Changed successfully");
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //admin route get all users
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${serverUrl}/api/v1/admin/users`,
        {},
        { withCredentials: true }
      );

      setAllUsers(res.data);

      setLoading(false);
    } catch (error) {
      console.log("Error getting all users", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${serverUrl}/api/v1/admin/users/${id}`, {
        withCredentials: true,
      });

      toast.success("User Deleted succesfully");
      getAllUsers();
    } catch (error) {
      console.log("Error deleting user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
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

  const loginStatusGetUser = async () => {
    const isloggedIn = await userLoginStatus();

    if (isloggedIn) {
      getUser();
    }
  };
  useEffect(() => {
    loginStatusGetUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user.role == "admin") {
        await getAllUsers();
      }
    };
    fetchData();
  }, [user?.role]);
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
        resetPassword,
        changePassword,
        allUsers,
        deleteUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
