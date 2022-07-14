import React from "react";
import "../../styles/ChatButton.css";

const ChatButton = ({ img, userName }) => {
  return (
    <div id="chat-button">
      <img src={img} />
      <div className="user-meta">
        <span>{userName}</span>
        <span>Active 4h ago</span>
      </div>
    </div>
  );
};

export default ChatButton;
