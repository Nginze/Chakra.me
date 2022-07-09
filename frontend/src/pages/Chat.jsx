import React, { useRef } from 'react'
// import {io} from 'socket.io-client'
import { socket } from '../components/chatpage/SocketManager'
import '../styles/Chat.css'
import ChatArea from '../components/chatpage/ChatArea'
import { useContext , useEffect, useState} from 'react'
import { userContext } from '../contexts/UserContext'


const Chat = () => {
  const [activeUsers, setActiveUsers] = useState(null)
  const {data: user} = useContext(userContext);
  // const socket = useRef(io("ws://localhost:8900"));
  socket.on("send-active-users", (activeUsers) => {
    setActiveUsers(activeUsers)
    console.log(activeUsers)
  });

  useEffect(() => {
    socket.emit("check-in", user?._id);
  }, [user]);

  return (
    <div id = 'chat'>
        <ChatArea activeUsers = {activeUsers} socket = {socket}/>
    </div>
  )
}

export default Chat