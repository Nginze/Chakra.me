const { redisClient } = require("./redisConfig");
const addUser = (userId, socketId) => {
  // const userExists = activeUsers.some(user => user.userId === userId);
  // if (!userExists) {
  //   activeUsers.push({ userId, socketId });
  // }
  redisClient.set(userId, socketId);
  redisClient.sAdd("activeUsers", userId);
};

const removeUser = socketId => {
  console.log("removed", socketId);
  redisClient.sRem
};

const getRecipient = (activeUsers, recipientId) => {
  return activeUsers.find(user => user.userId == recipientId);
};

const removeFromCommunity = (activeUsers, activeCommunityMembers, socketId) => {
  const disconnectedUser = activeUsers.find(user => user.socketId == socketId);
  console.log(disconnectedUser);
  const disconnectedUserId = disconnectedUser?.userId;
  console.log("disconnected User", disconnectedUserId);
  const communitiesArr = Object.keys(activeCommunityMembers);
  console.log("before", activeCommunityMembers);
  const newArr = communitiesArr.map(
    key =>
      (activeCommunityMembers[key] = activeCommunityMembers[key].filter(
        id => id != disconnectedUserId
      ))
  );
  console.log("after", activeCommunityMembers);
};

module.exports = { addUser, removeUser, getRecipient, removeFromCommunity };
