const {addUser, getRecipient, removeUser} = require('./helpers')

const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
});

let activeUsers = [];

io.on("connection", (socket) => {

    console.log("welcome to chat server", socket.id)
    socket.on("check-in", (userId) => {
        const hasStaleConnection = activeUsers.some((user) => user.userId == userId);
        
        if(hasStaleConnection){
            activeUsers = activeUsers.filter((user) => user.userId != userId );
        }

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
    })
})

