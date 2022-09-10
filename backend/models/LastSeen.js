const mongoose = require("mongoose");
const { Schema } = mongoose;

const LastSeenSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LastSeen", LastSeenSchema);
