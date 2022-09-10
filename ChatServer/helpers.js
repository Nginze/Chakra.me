const { redisClient } = require("./redisConfig");
const addUser = async (userId, socketId) => {
  userId && await redisClient.sAdd("onlineUsers", userId);
  userId && await redisClient.set(userId, socketId);
};

const removeUser = async userId => {
  console.log("removed", userId);
  userId && await redisClient.sRem("onlineUsers", userId);
};

const getRecipient = recipientId => {
  return redisClient.get(recipientId);
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
