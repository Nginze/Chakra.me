import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

export const PrivateRoutes = () => {
  const { isLoading, data:user } = useContext(userContext);
  if(isLoading){
    return <h1 style={{marginBottom: '6rem'}}>Please wait...</h1>
  }
  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};
