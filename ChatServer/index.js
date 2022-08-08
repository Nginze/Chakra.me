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
//Redis setup

//Legacy stateful server
// let activeUsers = [];
// let lastActive = {};
// let activeCommunityMembers = {};
io.on("connection", socket => {
  console.log("welcome to chat server", socket.id);
  socket.on("check-in", async userId => {
    // const hasStaleConnection = activeUsers.some(user => user.userId == userId);

    // if (hasStaleConnection) {
    //   activeUsers = activeUsers.filter(user => user.userId != userId);
    // }
    // lastActive[userId] = new Date();
    addUser(userId, socket.id);
    const activeUsers = await redisClient.sMembers("activeUsers");
    // io.emit("last-active", lastActive);
    io.emit("send-active-users", activeUsers);
  });
  // socket.on("disconnect", () => {
  //   removeFromCommunity(activeUsers, activeCommunityMembers, socket.id);
  // });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
    // removeFromCommunity(activeCommunityMembers, activeUsers, socket.id)
    removeUser(socket.id);
    // io.emit("last-active", lastActive);
    io.emit("send-active-users", activeUsers);
    // io.emit("activeCommunities", activeCommunityMembers);
    // console.log(activeUsers);
  });

  // socket.on("send-message", ({ senderId, receiverId, imgUrl, message }) => {
  //   console.log(imgUrl);
  //   lastActive[senderId] = new Date();
  //   const recipient = getRecipient(activeUsers, receiverId);
  //   io.to(recipient.socketId).emit("get-message", {
  //     senderId,
  //     imgUrl,
  //     message,
  //   });
  //   io.emit("last-active", lastActive);
  // });
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
