import "animate.css";
import React from "react";
import "../../styles/LModal.css";

const LModal = ({ show, toggle }) => {
  const BACKEND_URI = "http://localhost:5000";
  const BASE_URL = "http://localhost:3000";
  const width = 600,
    height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  const login = () => {
    window.open(
      BACKEND_URI + "/auth/google",
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
    );
  };

  return (
    show && (
      <>
        <div className="modal-background"></div>
        <div
          id="l-modal"
          className={
            show
              ? " animate__animated animate__fadeInRight animate__faster"
              : " animate__animated animate__fadeOutRight animate__faster"
          }
        >
          <span onClick={() => toggle(false)} class="close">
            &times;
          </span>
          <div className="hd">
            <h3 className="line1">Sign in to</h3>
            <h3
              className="logo"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src="https://img.icons8.com/color/30/000000/naruto-sign.png" />
              Chakra.me
            </h3>
            <p>
              Log in to save your progress. We won't post anything anywhere.
            </p>
          </div>
          <div className="ct">
            <button onClick={() => login()} className="google-btn">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" />{" "}
              <div>Google</div>
            </button>
            <button className="google-btn">
              <span class="iconify" data-icon="akar-icons:facebook-fill"></span>{" "}
              <div>Facebook</div>
            </button>
          </div>
          <div className="ft">Chakra.me© All Rights Reserved</div>
        </div>
      </>
    )
  );
};

export default LModal;
