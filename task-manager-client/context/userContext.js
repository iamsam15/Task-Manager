import React, { createContext, useEffect, useState, useContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  return (
    <UserContext.Provider value={"Hello from context"}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
