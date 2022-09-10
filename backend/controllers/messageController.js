const Message = require("../models/Message");
const Conversation = require("../models/Converstation");
const createMessage = async (req, res) => {
  console.log("hit");
  console.log(req.body);
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    sender: req.body.senderId,
    message: req.body.message,
  });
  const savedMessage = await newMessage.save();
  await Conversation.updateOne(
    { _id: req.body.conversationId },
    {
      $set: {
        hasMessages: true,
      },
    }
  );
  try {
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getConversationMessages = async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  })
    // .sort({ timeStamp: 1 })
    .limit(140)
    .populate("sender");
  res.status(200).json(messages);
};

const readAllMessages = async (req, res) => {
  console.log(req.params.conversationId);
  try {
    const result = await Message.updateMany(
      {
        conversationId: req.params.conversationId,
      },
      {
        $set: {
          hasRead: true,
        },
      }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getConversationMessages,
  readAllMessages
};
