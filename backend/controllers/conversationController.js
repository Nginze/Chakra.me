const Conversation = require("../models/Converstation");
const Message = require("../models/Message");
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
  try {
    const conversations = await Conversation.find(
      {
        hasMessages: true,
        members: { $in: [req.params.userId] },
      }
    ).populate("members");
    console.log(conversations);
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

const getConversationById = async (req, res) => {
  try{
    const conversation = await Conversation.findOne({_id: req.params.id}).populate("members");
    res.status(200).json(conversation)
  }catch(err){
    res.status(500).json(err)
  }
}
module.exports = {
  createConversation,
  getUserConversations,
  getOneConversation,
  getConversationById
};
