import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "../../styles/ChatButton.css";

const ChatButton = ({
  img,
  userName,
  lastActive,
  lastMessage,
  conversationId,
  lastSeen
}) => {
  // const messages = [
  //   {
  //     createdAt: Date.now()
  //   },
  //   {
  //     createdAt: '2022-07-08T19:45:51.732+00:00'
  //   },
  //   {
  //     createdAt: Date.now()
  //   }
  // ]
   const fetchMessages = async ({conversationId}) => {
    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/message/${conversationId}`,
      withCredentials: true,
    });
    return data;
  };
  const {data: messages, isLoading} = useQuery(["messages", conversationId], () => fetchMessages({conversationId}))
  const timeState = Math.abs(
    moment(lastActive).diff(moment(Date.now()), "seconds")
  );
  const [unread, setUnread] = useState(0);
  const countUnread = () => {
    let unread = 0; 
    messages?.forEach(message => {
      if (new Date(message.createdAt) > new Date(lastSeen)) {
        unread += 1;
      }
    });
    return unread;
  };
  useEffect(() => {
    setUnread(countUnread());
  }, [messages]);
  return (
    <div id="chat-button">
      <img src={img} />
      <div className="user-meta">
        <span>{userName}</span>
        <span>{unread}</span>
        {!lastActive ? null : timeState > 0 && timeState < 180 ? (
          <span style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <div class="online-indicator">
              <span class="blink"></span>
            </div>
            Online
          </span>
        ) : (
          <span>{moment(lastActive).fromNow()}</span>
        )}
      </div>
    </div>
  );
};

export default ChatButton;
