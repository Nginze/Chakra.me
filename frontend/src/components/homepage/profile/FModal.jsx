import { React } from "react";
import "../../../styles/FModal.css";
import FProfile from "./FProfile";

const FModal = ({ show, toggle, type, data }) => {
  return (
    show && (
      <>
        <div className="modal-background"></div>
        <div
          style={{ width: "300px", height: "400px" }}
          id="e-modal"
          className="animate__animated animate__fadeIn animate__faster"
        >
          <span onClick={() => toggle(false)} class="close">
            &times;
          </span>
          <div className="f-content">
            {type == "followers" ? (
              <h3 style={{ marginBottom: "6px", fontWeight: "400px" }}>
                Followers
              </h3>
            ) : (
              <h3 style={{ marginBottom: "6px", fontWeight: "400px" }}>
                Following
              </h3>
            )}
            <div>
              {type == "followers"
                ? data?.followers.map(follower => {
                    return <FProfile data={follower} />;
                  })
                : data?.following.map(followee => {
                    return <FProfile data={followee} />;
                  })}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default FModal;
