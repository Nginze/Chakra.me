import { Avatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useQueryClient } from "react-query";
import useLastSeen from "../hooks/useLastSeen";
import { isNotUser } from "../utils";
import Chat from "./Chat";

const ChatPane = ({
  conversations,
  socket,
  user,
  setChat,
  setReceiver,
  openChat,
  msgTrigger,
  onlineUsers
}) => {
  const queryClient = useQueryClient();
  const { lastSeen } = useLastSeen(user?._id);
  const updateLastSeen = async (conversationId, userId) => {
    await axios({
      method: "put",
      url: `http://localhost:5000/lastseen/${conversationId}/${userId}`,
      withCredentials: true,
    });
    queryClient.invalidateQueries(["lastSeen"])
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          padding: "0 20px",
          borderBottom: "1px solid #e0e0e0",
          height: "9.4%",
        }}
      >
        <Typography>Messages</Typography>
      </Box>
      <Box sx={{ overflowY: "auto", height: "90%" }}>
        {conversations?.map(conversation => {
          const notUser = isNotUser(conversation.members, user._id);
          const lSeen = lastSeen?.filter(
            ls => ls.conversationId === conversation._id
          )[0]?.updatedAt;
          return (
            <div
              onClick={() => {
                setChat(
                  queryClient.getQueryData(["messages", conversation._id])
                );
                setReceiver(notUser);
                updateLastSeen(conversation._id, user?._id)
              }}
              
            >
              <Chat
                key={conversation._id}
                openChat={openChat}
                conversationId={conversation._id}
                socket={socket}
                msgTrigger = {msgTrigger}
                username={notUser.userName}
                avatar={notUser.imgUrl}
                isOnline={onlineUsers?.includes(notUser._id)}
                lastSeen={lSeen}
                lastMessage={"Hi bro"}
                user = {user}
                updateLastSeen = {updateLastSeen}
              />
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default ChatPane;
