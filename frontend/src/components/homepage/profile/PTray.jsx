import { React, useState } from "react";
import { useQuery } from "react-query";
import { getUser } from "../../../helpers";
import "../../../styles/PTray.css";
import Feed from "../Feed";

const PTray = () => {
  const [postActive, setPostActive] = useState(true);
  const { data: user, isLoading } = useQuery("user", getUser);

  return (
    <div id="p-tray">
      <div className="p-tray-head">
        <button
          onClick={() => setPostActive(true)}
          className={!postActive ? "p-btn" : "p-btn t-active"}
        >
          <i class="fi fi-rs-apps"></i>
          <span>Posts</span>
          {postActive && <div className="p-underline"></div>}
        </button>
        <button
          onClick={() => setPostActive(false)}
          className={postActive ? "s-btn" : "s-btn t-active"}
        >
          <i class="fi fi-rs-bookmark"></i>
          <span>Saved</span>
          {!postActive && <div className="s-underline"></div>}
        </button>
      </div>
      <div className="p-tray-content">
        <Feed isLoading={isLoading} posts={user?.posts} />

        {user?.posts?.length == 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{ width: "100px", height: "100px", marginBottom: "4px" }}
              src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png"
            />
            <span style={{ fontSize: "15px", color: "#636466" }}>
              You haven't shared, answered or posted anything yet.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTray;
