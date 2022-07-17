const Conversation = require("../models/Converstation");

const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserConversations = async (req, res) => {
  console.log(req.params.userId);
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).populate("members");
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.userOne, req.params.userTwo] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createConversation,
  getUserConversations,
  getOneConversation,
};
