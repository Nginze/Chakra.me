import React from "react";
import { ListItem, Avatar, ListItemText, ListItemIcon } from "@mui/material";
import { Box } from "@mui/system";

const Chat = ({ avatar, username, isOnline, lastMessage }) => {
  return (
    <ListItem sx={{padding: '8px 20px'}} button key="RemySharp">
      <ListItemIcon sx={{ width: "56px", height: "56px", marginRight: '12px' }}>
        <Avatar
          sx={{ width: "100%", height: "100%" }}
          alt={username}
          src={avatar}
        />
      </ListItemIcon>
      <Box>
        <ListItemText primary = {username} secondary = {'Active Now'}/>
      </Box>
    </ListItem>
  );
};

export default Chat;
