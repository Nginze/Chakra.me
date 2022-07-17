const mongoose = require("mongoose");
const { Schema } = mongoose;

var UserSchema = new Schema({
  thirdPartyId: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },

  imgUrl: {
    type: String,
    required: true,
  },
  bio: {
    type: String, 
  },

  followers: [{ type: Schema.Types.ObjectId, ref: "Users" }],

  following: [{ type: Schema.Types.ObjectId, ref: "Users" }],

  posts: [{ type: Schema.Types.ObjectId, ref: "Posts" }],

  storyInbox: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

const User = mongoose.model("Users", UserSchema);
UserSchema.index({ userName: "text" });

module.exports = User;
