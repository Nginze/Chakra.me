import { React, useContext, useEffect } from "react";
import { userContext } from "../contexts/UserContext";

const Callback = () => {
  useEffect(() => {
    if (window.opener.location.pathname === "/") {
        window.opener.location.replace("/home");
    }
    if (window.opener) {
       window.close();
    }
  });
  return <div style={{ marginTop: "6rem" }}>Please Wait ... </div>;
};

export default Callback;
