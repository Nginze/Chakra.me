import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

export const PrivateRoutes = () => {
  const { data:user, isAuth } = useContext(userContext);
  return <>{ isAuth || user ? <Outlet /> : <Navigate to="/" />}</>;
};
