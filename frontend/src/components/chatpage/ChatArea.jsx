import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState, useRef } from "react";
import ContentShimmer, { ProfileShimmer } from "react-content-shimmer";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import "../.././styles/ChatArea.css";
import { userContext } from "../../contexts/UserContext";
import ChatButton from "./ChatButton";
import Message from "./Message";
import InputEmoji from "react-input-emoji";
const ChatArea = ({ activeUsers, socket }) => {
  const [searchParams] = useSearchParams();
  const [lastActive, setLastActive] = useState({});
  const [chatMessages, setChatMessages] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [receiverData, setReceiver] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isLoadingChat, setLoadingChat] = useState(false);
  const [message, setMessage] = useState("");
  const scrollRef = useRef();
  const { data: user } = useContext(userContext);

  socket.on("get-message", ({ senderId, message, imgUrl }) => {
    console.log(imgUrl);
    setArrivalMessage({
      imgUrl,
      sender: senderId,
      message: message,
      createdAt: Date.now(),
    });
  });

  socket.on("last-active", lastActive => setLastActive(lastActive));
  useEffect(() => scrollRef.current?.scrollIntoView({behavior: "smooth"}) , [chatMessages])
  useEffect(() => {
    arrivalMessage && setChatMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const fetchNewConversation = async () => {
    return await axios({
      method: "get",
      url: `http://localhost:5000/conversation/${searchParams.get("cid")}/byId`,
      withCredentials: true,
    });
  };
  const sendMessage = async e => {
    // e.preventDefault();
    setChatMessages([
      ...chatMessages,
      {
        imgUrl: user.imgUrl,
        receiverId: receiverData._id,
        sender: user._id,
        message,
      },
    ]);
    const isRecipientOnline = activeUsers.find(
      user => user.userId == receiverData._id
    );
    console.log(isRecipientOnline);
    if (isRecipientOnline) {
      console.log("recipient is online");
      socket.emit("send-message", {
        receiverId: receiverData._id,
        imgUrl: user.imgUrl,
        senderId: user._id,
        message,
      });
    }
    const newMessage = await axios({
      method: "post",
      url: `http://localhost:5000/message/`,
      withCredentials: true,
      data: {
        conversationId: conversationId,
        senderId: user._id,
        message: message,
      },
    });
  };
  const getConversations = async () => {
    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/conversation/${user._id}`,
      withCredentials: true,
    });
    return data;
  };

  const fetchMessages = async (conversationId, notUser) => {
    setLoadingChat(true);
    setReceiver(notUser);
    setConversationId(conversationId);
    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/message/${conversationId}`,
      withCredentials: true,
    });
    setChatMessages(data);
    setLoadingChat(false);
    return data;
  };

  const { data: conversations } = useQuery(
    ["conversations", user?._id],
    getConversations,
    {
      enabled: !!user,
    }
  );
  const { data: newConversation } = useQuery(
    "newConversation",
    fetchNewConversation,
    {
      enabled: !!(searchParams.get("cid") && !searchParams.get("existing")),
    }
  );
  const timeState =
    lastActive &&
    Math.abs(
      moment(lastActive[receiverData?._id]).diff(moment(Date.now()), "seconds")
    );

  const notUser = newConversation?.data.members.find(
    _user => _user._id != user._id
  );
  useEffect(() => {
    if (searchParams.get("cid")) {
      axios({
        method: "get",
        url: `http://localhost:5000/user/${searchParams.get("rcv")}`,
        withCredentials: true,
      }).then(res => fetchMessages(searchParams.get("cid"), res.data));
    }
  }, []);

  return (
    <div id="chat-area">
      <div className="chat-pane">
        <div className="chat-pane-head">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="https://img.icons8.com/color/20/000000/naruto-sign.png" />
            Chakra Messenger
          </span>
        </div>
        <div className="friends-container">
          {!conversations &&
            [1, 2, 3, 4, 5, 6].map(shimmer => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "18px 20px",
                  }}
                >
                  <ProfileShimmer style={{ width: "56px", height: "56px" }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <ContentShimmer
                      style={{
                        height: "15px",
                        marginBottom: "0.5rem",
                        width: "180px",
                      }}
                    />
                    <ContentShimmer
                      style={{ height: "15px", width: "120px" }}
                    />
                  </div>
                </div>
              );
            })}
          {newConversation && (
            <>
              <div>
                <ChatButton
                  img={notUser?.imgUrl}
                  userName={notUser?.userName}
                />
              </div>
            </>
          )}
          {conversations?.map(conversation => {
            const notUser = conversation.members.find(
              _user => _user._id != user._id
            );
            return (
              <div onClick={() => fetchMessages(conversation._id, notUser)}>
                <ChatButton
                  img={notUser.imgUrl}
                  userName={notUser.userName}
                  lastActive={lastActive[notUser._id]}
                />
              </div>
            );
          })}
        </div>
      </div>
      {isLoadingChat && (
        <div className="message-area-alt">
          <div class="loadingio-spinner-spinner-2gw7yb8gxej">
            <div class="ldio-h3evnyucb7">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}

      {chatMessages ? (
        <div className="chat-container">
          <div className="chat-container-heading">
            <div id="chat-heading">
              <img
                style={{ width: "1.7rem", height: "1.7rem" }}
                src={receiverData?.imgUrl}
              />
              <div className="user-meta">
                <span>{receiverData?.userName}</span>
                {timeState > 0 && timeState < 180 ? (
                  <span>Online</span>
                ) : (
                  <span>{moment(lastActive[receiverData?._id]).fromNow()}</span>
                )}
              </div>
            </div>
          </div>
          <div className="message-area">
            {chatMessages.map(message => {
              return (
                <div ref={scrollRef}>
                <Message
                  imgUrl={message?.imgUrl}
                  messageInfo={message}
                  own={
                    message.sender?._id === user._id ||
                    message.sender === user._id
                  }
                />
                </div>
              );
            })}
          </div>
           <InputEmoji
              value={message}
              onChange={setMessage}
              onEnter={sendMessage}
              cleanOnEnter
              placeholder="Message..."
            />
          {/* <form>
            <button onClick={sendMessage}>Send</button>
           
          </form> */}
        </div>
      ) : (
        <div className="message-area-alt">
          <div style={{ fontWeight: "300" }}>
            <img
              style={{ marginBottom: "0.4rem" }}
              src="https://img.icons8.com/ios/80/000000/paper-plane.png"
            />
            <span
              style={{
                marginBottom: "0.5rem",
                fontSize: "22px",
                lineHeight: "26px",
              }}
            >
              Your Messages
            </span>
            <span>Send private messages to your followers and friends</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
