const mongoose = require("mongoose");
const { Schema } = mongoose;
const ConversationSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
