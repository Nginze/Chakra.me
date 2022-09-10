import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { isMyself } from "../utils";
const MessageArea = ({ openChat, setChat, user, currentReceiver, onlineUsers }) => {
  return openChat ? (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
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
          <Avatar
            sx={{ width: "24px", height: "24px", marginRight: "10px" }}
            alt={currentReceiver.userName}
            src={currentReceiver.imgUrl}
          />
          <Box>
            <ListItemText
              primary={currentReceiver.userName}
              secondary={onlineUsers?.includes(currentReceiver._id) ? "Active Now" : "Offline"}
            />
          </Box>
        </Box>
        {/* <IconButton sx={{width: '24px', height: '24px'}}>
          <InfoOutlinedIcon />
        </IconButton> */}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "72%",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {openChat.map(message => (
          <Message
            text={message.message}
            avatar={message.sender.imgUrl}
            isMyself={isMyself(message.sender, user?._id)}
          />
        ))}
      </Box>
      <Box>
        <ChatInput
          openChat={openChat}
          setChat={setChat}
          user={user}
          conversationId={openChat[0]?.conversationId}
        />
      </Box>
    </>
  ) : null;
};

export default MessageArea;
