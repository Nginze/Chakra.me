import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
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
