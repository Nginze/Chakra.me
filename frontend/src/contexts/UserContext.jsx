import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
export const userContext = createContext();

const UserProvider = ({ children }) => {
  const BASE_URL = "http://localhost:3000/auth/callback";
  const getUser = async () => {
    const user = await axios({
      method: "get",
      url: "http://localhost:5000/user",
      withCredentials: true,
    });
    return user.data.user;
  };

  const { data, isLoading } = useQuery("user", getUser);

  return (
    <userContext.Provider
      value={{ data, getUser, isLoading }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
