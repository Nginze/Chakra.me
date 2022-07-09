const addUser = (activeUsers, userId, socketId) => {
    const userExists = activeUsers.some((user) => user.userId === userId);
    if(!userExists){
        activeUsers.push({userId, socketId});
    }
    
};

const removeUser = (activeUsers, socketId) => {
    activeUsers = activeUsers.filter((user) => user.socketId != socketId)
    console.log(activeUsers)
};

const getRecipient  = (activeUsers, recipientId) => {
  return activeUsers.find((user) => user.userId == recipientId);
};


module.exports = {
    addUser,
    removeUser, 
    getRecipient
}