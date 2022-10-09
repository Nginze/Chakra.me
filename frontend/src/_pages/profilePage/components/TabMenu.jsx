import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Feed from "../../../components/homepage/Feed";

const TabMenu = ({ posts, replies, saved }) => {
  const [value, setValue] = useState("Posts");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        /* A CSS property that is used to display the elements in a column. */
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "1.4rem" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Posts" value={"Posts"} />
          <Tab label="Replies" value={"Replies"} />
          <Tab label="Saved" value={"Saved"} />
        </Tabs>
      </Box>

      <Box alignSelf={"center"} className="p-tray-content">
        {/* <Feed isLoading={false} posts={posts} /> */}

        {0 == 0 && (
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
      </Box>
    </Box>
  );
};

export default TabMenu;
