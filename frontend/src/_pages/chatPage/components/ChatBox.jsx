import { Grid } from "@mui/material";
import React from "react";
import ChatPane from "./ChatPane";
import MessageArea from "./MessageArea";

const ChatBox = () => {
  return (
    <div
      style={{
        width: "950px",
        height: "83vh",
        backgroundColor: "#fefeff",
        margin: "auto",
        marginTop: "5rem"
      }}
    >
      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          borderRadius: "2px",
        }}
        container
      >
        <Grid
          item
          xs={3.5}
          sx={{
            backgroundColor: "#fefeff",
            height: "100%",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <ChatPane />
        </Grid>

        <Grid item xs={8.5} sx={{ backgroundColor: "#fefeff", height: "100%" }}>
          <MessageArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatBox;
