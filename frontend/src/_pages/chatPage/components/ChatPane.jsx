import { Avatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Chat from "./Chat";

const ChatPane = ({ chats }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          padding: "0 20px",
          borderBottom: "1px solid #e0e0e0",
          height: "10%",
        }}
      >
        <Typography>Messages</Typography>
      </Box>
      <Box sx={{ overflowY: "auto", height: "90%" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 8].map(chat => {
          return (
            <Chat
              username={"John Does"}
              avatar={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
              }
              isOnline={true}
              lastMessage={"Hi bro"}
            />
          );
        })}
      </Box>
    </>
  );
};

export default ChatPane;
