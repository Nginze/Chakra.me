import moment from "moment";
import React from "react";
import "../../styles/ChatButton.css";

const ChatButton = ({ img, userName, lastActive, lastMessage }) => {
  console.log(lastActive);
  const timeState = Math.abs(
    moment(lastActive).diff(moment(Date.now()), "seconds")
  );
  return (
    <div id="chat-button">
      <img src={img} />
      <div className="user-meta">
        <span>{userName}</span>
        {!lastActive ? null : timeState > 0 && timeState < 180 ? (
          <span style={{display: 'flex', alignItems: 'center'}}>
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
