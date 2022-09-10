import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { userContext } from "../../../contexts/UserContext";
import { socketContext } from "../contexts/SocketContext";
import useConversations from "../hooks/useConversations";
import ChatPane from "./ChatPane";
import MessageArea from "./MessageArea";

const ChatBox = () => {
  const { data: user } = useContext(userContext);
  const { conversations } = useConversations(user?._id);
  const [openChat, setChat] = useState();
  const [currentReceiver, setReceiver] = useState();
  const [msgTrigger, setTrigger] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(false);
  const { socket } = useContext(socketContext);
  const queryClient = useQueryClient();

  socket.off("online_users").on("online_users", list => {
    setOnlineUsers(list);
  });
  socket.off("get_message").on("get_message", async payload => {
    setTrigger(!msgTrigger);
    const { conversationId } = payload;
    await queryClient.cancelQueries(["messages", conversationId]);
    if (
      openChat &&
      openChat[0].conversationId === conversationId &&
      payload.sender._id !== user._id
    ) {
      console.log("hit first if");
      setChat([...openChat, payload]);
    }
    if (payload.sender._id !== user._id) {
      console.log("hit second if");
      queryClient.setQueryData(["messages", conversationId], old => [
        ...old,
        payload,
      ]);
    }
  });
  useEffect(() => {
    socket.emit("join-chats", conversations);
  }, [conversations, socket]);
  return (
    <div
      style={{
        width: "950px",
        height: "83vh",
        backgroundColor: "#fefeff",
        margin: "auto",
        marginTop: "5rem",
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
          xs={4.3}
          sx={{
            backgroundColor: "#fefeff",
            height: "100%",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <ChatPane
            openChat={openChat}
            msgTrigger={msgTrigger}
            conversations={conversations}
            user={user}
            setChat={setChat}
            setReceiver={setReceiver}
            onlineUsers = {onlineUsers}
            socket={socket}
          />
        </Grid>

        <Grid item xs={7.7} sx={{ backgroundColor: "#fefeff", height: "100%" }}>
          <MessageArea
            openChat={openChat}
            onlineUsers = {onlineUsers}
            setChat={setChat}
            user={user}
            currentReceiver={currentReceiver}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatBox;
