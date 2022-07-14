import React from "react";
import Feed from "../components/homepage/Feed";
import "../styles/NewProfile.css";
const NewProfile = () => {
  return (
    <div id="new-profile">
      <Feed />
      <div>
        <div id="section">
          <div>
            <img src="" />
          </div>
          <div>
            <div>
              <img src="" />
            </div>
            <div>
              <span>
                <span>Followers</span>
                <span>1,000</span>
              </span>
              <span>
                <span>Following</span>
                <span>1,000</span>
              </span>
            </div>
            <div>
              <button>Follow</button>
              <button>Chat</button>
            </div>
          </div>
        </div>
        <div id="section"></div>
      </div>
    </div>
  );
};

export default NewProfile;
