import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const BACKEND_URI = "http://localhost:5000";
const BASE_URL = "http://localhost:3000";
const width = 600,
  height = 600;
const left = window.innerWidth / 2 - width / 2;
const top = window.innerHeight / 2 - height / 2;

const googleLogin = () => {
  window.open(
    BACKEND_URI + "/auth/google",
    "",
    `toolbar=no, location=no, directories=no, status=no, menubar=no, 
  scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
  height=${height}, top=${top}, left=${left}`
  );
};

const discordLogin = () => {
  window.open(
    BACKEND_URI + "/auth/discord",
    "",
    `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
  );
};

const githubLogin = () => {
  window.open(
    BACKEND_URI + "/auth/github",
    "",
    `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
  );
};
const Login = () => {
  return (
    <div id="login">
      <div className="login-wrapper">
        <span className="login-header">Welcome 👋</span>
        <span className="legal-policy">
          By logging in you accept our Privacy Policy and Terms of Service.
        </span>
        <div className="social-logins-container">
          <div className="ct">
            <button onClick={() => googleLogin()} className="google-btn">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" />{" "}
              <div>Google</div>
            </button>
            <button className="google-btn">
              <span class="iconify" data-icon="akar-icons:facebook-fill"></span>{" "}
              <div>Facebook</div>
            </button>
            <button
              onClick={() => githubLogin()}
              id="github-btn"
              className="google-btn"
            >
              <span
                class="iconify"
                data-icon="bi:github"
                data-width="48"
              ></span>{" "}
              <div>GitHub</div>
            </button>
            <button
              onClick={() => discordLogin()}
              id="discord-btn"
              className="google-btn"
            >
              <span
                class="iconify"
                data-icon="bxl:discord-alt"
                data-width="48"
              ></span>{" "}
              <div>Discord</div>
            </button>
          </div>
          <div className="ft">Chakra.me© All Rights Reserved</div>
        </div>
      </div>
      <div className="login-footer">
        <div className="logo">
          <img src="https://img.icons8.com/color/30/000000/naruto-sign.png" />
          Chakra.me
        </div>
        <div>
          <Link to="/">Privacy Policy</Link>
          <Link to="/"></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
