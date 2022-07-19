const { addUser, getRecipient, removeUser } = require("./helpers");

const io = require("socket.io")(8900 || process.env.PORT, {
  cors: {
    origin: ["http://localhost:3000", "*"],
  },
});

let activeUsers = [];
let lastActive = {};
let activeCommunityMembers = {};
io.on("connection", socket => {
  console.log("welcome to chat server", socket.id);
  socket.on("check-in", userId => {
    const hasStaleConnection = activeUsers.some(user => user.userId == userId);

    if (hasStaleConnection) {
      activeUsers = activeUsers.filter(user => user.userId != userId);
    }
    lastActive[userId] = new Date();
    addUser(activeUsers, userId, socket.id);
    io.emit("last-active", lastActive)
    io.emit("send-active-users", activeUsers);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
    removeUser(activeUsers, socket.id);
    io.emit("last-active", lastActive)
    io.emit("send-active-users", activeUsers);
    console.log(activeUsers);
  });

  socket.on("send-message", ({ senderId, receiverId, imgUrl, message }) => {
    console.log(imgUrl)
    lastActive[senderId] = new Date();
    const recipient = getRecipient(activeUsers, receiverId);
    io.to(recipient.socketId).emit("get-message", {
      senderId,
      imgUrl,
      message,
    });
    io.emit("last-active", lastActive)
  });
});
