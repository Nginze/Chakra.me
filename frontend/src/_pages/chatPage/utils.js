export const isNotUser = (participants, loggedInUserId) => {
  return participants.filter(
    participant => participant._id !== loggedInUserId
  )[0];
};

export const isMyself = (sender, loggedInUserId) => {
  return sender._id === loggedInUserId;
};

export const countUnread = (messages, lastSeen) => {
  let unread = 0;
  messages?.forEach(message => {
    if (new Date(message.createdAt) > new Date(lastSeen)) {
      unread += 1;
    }
  });
  return unread;
};
