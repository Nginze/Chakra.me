import { React } from "react";
import Feed from "../Feed";

const OTray = ({ isLoading, posts }) => {
  return (
    <div id="p-tray">
      <div className="p-tray-head">
        <button className={"p-btn t-active"}>
          <i class="fi fi-rs-apps"></i>
          <span>Posts</span>
          {<div className="p-underline"></div>}
        </button>
      </div>
      <div className="p-tray-content">
        {<Feed isLoading={isLoading} posts={posts} />}
        {posts?.length == 0 && (
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

export default OTray;
