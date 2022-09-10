const LastSeen = require("../models/LastSeen");

const getTimestamps = async (req, res) => {
  try {
    const timestamps = await LastSeen.find({ userId: req.params.userId });
    res.status(200).json(timestamps);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTimestamps = async (req, res) => {
  try {
    const result = await LastSeen.updateOne(
      {
        userId: req.params.userId,
        conversationId: req.params.conversationId,
      },
      { $set: { userId: req.body.userId } },
      { upsert: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateTimestamps,
  getTimestamps,
};
