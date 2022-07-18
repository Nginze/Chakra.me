import { React, useState } from "react";
import "../../../styles/PInfo.css";
import EModal from "./EModal";
import FModal from "./FModal";

const PInfo = ({ user }) => {
  const [EModalOpen, setEModalOpen] = useState(false);
  const [showFollowers, setFollowers] = useState(false);
  const [showFollowing, setFollowing] = useState(false);
  return (
    <div id="p-info">
      {user && (
        <div className="p-meta-container">
          <img id="p-img" src={user.imgUrl} />
          <div className="p-meta">
            <h2
              style={{ display: "flex", alignItems: "center" }}
              className="p-meta-name"
            >
              {user.userName}{" "}
              <div
                onClick={() => setEModalOpen(true)}
                style={{ marginLeft: "1rem", cursor: "pointer" }}
              >
                <span
                  class="iconify"
                  data-icon="ph:gear"
                  data-width="22"
                ></span>
              </div>{" "}
            </h2>

            <div className="p-meta-stats">
              <span> {user.posts.length} posts </span>
              <span onClick={() => setFollowers(true)}>
                {" "}
                {user.followers.length} followers{" "}
              </span>
              <span onClick={() => setFollowing(true)}>
                {" "}
                {user.following.length} following{" "}
              </span>
            </div>
            <p className="p-bio">{user.bio}</p>
          </div>
        </div>
      )}
      <EModal show={EModalOpen} toggle={setEModalOpen} />
      <FModal
        show={showFollowers}
        data={user}
        toggle={setFollowers}
        type="followers"
      />
      <FModal
        show={showFollowing}
        data={user}
        toggle={setFollowing}
        type="following"
      />
    </div>
  );
};

export default PInfo;
