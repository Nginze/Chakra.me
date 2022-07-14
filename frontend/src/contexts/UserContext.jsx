import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
export const userContext = createContext();

const UserProvider = ({ children }) => {
  const BASE_URL = "http://localhost:3000/auth/callback";
  const [user, setUser] = useState();
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
    <userContext.Provider value={{ data, setUser, getUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
