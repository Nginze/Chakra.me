
const addUser = (activeUsers, userId, socketId) => {
  const userExists = activeUsers.some(user => user.userId === userId);
  if (!userExists) {
    activeUsers.push({ userId, socketId });
  }
};

const removeUser = (activeUsers, socketId) => {
  console.log("removed", socketId);
  activeUsers = activeUsers.filter(user => user.socketId != socketId);
};

const getRecipient = (activeUsers, recipientId) => {
  return activeUsers.find(user => user.userId == recipientId);
};

const removeFromCommunity = (activeUsers, activeCommunityMembers, socketId) => {
  const disconnectedUser = activeUsers.find(user => user.socketId == socketId)
  console.log(disconnectedUser)
  const disconnectedUserId = disconnectedUser?.userId
console.log("disconnected User",disconnectedUserId)
  const communitiesArr = Object.keys(activeCommunityMembers)
  console.log("before", activeCommunityMembers)
  const newArr = communitiesArr.map((key) =>  activeCommunityMembers[key] = activeCommunityMembers[key].filter(id => id != disconnectedUserId))
  console.log("after", activeCommunityMembers)
}

module.exports = { addUser, removeUser, getRecipient, removeFromCommunity};
