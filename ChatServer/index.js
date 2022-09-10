const { AsyncLocalStorage } = require("async_hooks");
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const {
  addUser,
  getRecipient,
  removeUser,
  removeFromCommunity,
} = require("./helpers");
const { redisClient } = require("./redisConfig");
const socketOptions = {
  cors: {
    origin: ["http://localhost:3000", "*"],
  },
};
const io = require("socket.io")(httpServer, socketOptions);

io.on("connection", socket => {
  console.log("welcome to chat server", socket.id);
  socket.on("join-chats", conversations => {
    conversations?.forEach(conversation => {
      socket.join(conversation._id);
    });
    io.emit("emitting_online_rooms", { rooms: io.sockets.adapter.rooms });
  });
  socket.on("send_message", payload => {
    io.to(payload.conversationId).emit("get_message", payload);
  });
  socket.on("log_in", async userId => {
    socket.userId = userId;
    console.log(socket.userId);
    addUser(userId, socket.id);
    io.emit("online_users", await redisClient.sMembers("onlineUsers"));
  });

  socket.on("disconnect", async () => {
    console.log(socket.id, "disconnected");
    removeUser(socket.userId);
    io.emit("online_users", await redisClient.sMembers("onlineUsers"));
  });

  // socket.on(
  //   "send-message",
  //   async ({ senderId, receiverId, imgUrl, message }) => {
  //     const activeUsers = await redisClient.sMembers("activeUsers");
  //     if (activeUsers.includes(receiverId)) {
  //       const recipientSocket = getRecipient(receiverId);
  //       io.to(recipientSocket).emit("get-message", {
  //         senderId,
  //         imgUrl,
  //         message,
  //       });
  //     }
  //   }
  // );
  // socket.on("community-join", ({ communityId, userId }) => {
  //   const hasStaleConnection = activeUsers.some(user => user.userId == userId);
  //   if (!activeCommunityMembers[communityId]) {
  //     activeCommunityMembers[communityId] = [];
  //   }
  //   if (communityId && !activeCommunityMembers[communityId].includes(userId)) {
  //     activeCommunityMembers[communityId].push(userId);
  //   }

  //   io.emit("activeCommunities", activeCommunityMembers);
  // });
});

httpServer.listen(process.env.PORT || 8900);
