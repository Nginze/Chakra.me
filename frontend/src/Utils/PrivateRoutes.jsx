import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

export const PrivateRoutes = () => {
  const { isLoading, data: user } = useContext(userContext);
  if (isLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="https://img.icons8.com/color/80/000000/naruto-sign.png" /><h1></h1>
      </div>
    );
  }
  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};
