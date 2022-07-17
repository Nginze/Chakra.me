import { React, useContext, useEffect } from "react";
import { userContext } from "../contexts/UserContext";

const Callback = () => {
  const {data: user} = useContext(userContext)
  useEffect(() => {
    if (window.opener.location.pathname === "/") {
      user && window.opener.location.replace("/home");
    }
    if (window.opener) {
      user && window.close();
    }
  });
  return <div style={{ marginTop: "6rem" }}>Please Wait ... </div>;
};

export default Callback;
