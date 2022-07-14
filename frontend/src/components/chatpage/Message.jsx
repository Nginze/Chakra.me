import React from "react";
import "../../styles/Message.css";

const Message = ({ messageInfo, own, imgUrl }) => {
  return (
    <div className="message-container">
      {/* { console.log(messageInfo?.message, own)} */}
      {!own && (
        <img
          style={{ height: "1.5rem", width: "1.5rem", borderRadius: "50%" }}
          src={imgUrl ? imgUrl : messageInfo?.sender.imgUrl}
        />
      )}
      <div id="message" className={own ? "own" : "not-own"}>
        {messageInfo.message}
      </div>
    </div>
  );
};

export default Message;
