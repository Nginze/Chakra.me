const mongoose = require('mongoose')
const {Schema} = mongoose;

var UserSchema = new Schema({
   
    thirdPartyId: {
        type: String,
        required: true
    },

    userName: {
        type: String, 
        required: true
    },

    imgUrl: {
        type: String, 
        required: true
    },

    followers: [
       {type: Schema.Types.ObjectId, ref: 'Users'}
    ],

    following: [
        {type: Schema.Types.ObjectId, ref: 'Users'}
    ],

    posts: [{type: Schema.Types.ObjectId, ref: 'Posts'}],

    storyInbox: [{type: Schema.Types.ObjectId, ref: 'Stories'}]



})
  
const User = mongoose.model("Users", UserSchema)

module.exports = User