const {addUser, getRecipient, removeUser} = require('./helpers')

const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
});

const activeUsers = [];

io.on("connection", (socket) => {
    socket.on("check-in", (userId) => {
        addUser(activeUsers, userId, socket.id);
        io.emit("send-active-users", activeUsers);
    })

    socket.on("disconnect", () => {
        removeUser(activeUsers, socket.id);
        io.emit("send-active-users", activeUsers);
    })

    socket.on("send-message", ({senderId, receiverId,imgUrl, message}) => {
        const recipient = getRecipient(activeUsers, receiverId);
        io.to(recipient.socketId).emit("get-message", {senderId,imgUrl, message});
        console.log('emitted')
    })
})

