import React from "react";
// import {io} from 'socket.io-client'
import { useContext, useEffect, useState } from "react";
import ChatArea from "../components/chatpage/ChatArea";
import { socket } from "../components/chatpage/SocketManager";
import { userContext } from "../contexts/UserContext";
import "../styles/Chat.css";

const Chat = () => {
  const [activeUsers, setActiveUsers] = useState(null);
  const { data: user } = useContext(userContext);
  // const socket = useRef(io("ws://localhost:8900"));
  socket.on("send-active-users", activeUsers => {
    setActiveUsers(activeUsers);
    console.log(activeUsers);
  });

  useEffect(() => {
    socket.emit("check-in", user?._id);
  }, [user]);

  return (
    <div id="chat">
      <ChatArea activeUsers={activeUsers} socket={socket} />
    </div>
  );
};

export default Chat;
