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
  socket.on("check-in", async userId => {
    socket.userId = userId;
    addUser(userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
    removeUser(socket.userId);
  });

  socket.on(
    "send-message",
    async ({ senderId, receiverId, imgUrl, message }) => {
      const activeUsers = await redisClient.sMembers("activeUsers");
      if (activeUsers.includes(receiverId)) {
        const recipientSocket = getRecipient(receiverId);
        io.to(recipientSocket).emit("get-message", {
          senderId,
          imgUrl,
          message,
        });
      }
    }
  );
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
