const mongoose = require('mongoose')
const {Schema} = mongoose;

const CommentSchema = new Schema({
    postId:{
        type: Schema.Types.ObjectId,
        default: null
      
    },
    parentId:{
        type: Schema.Types.ObjectId,
        default: null
    },
    message:{
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    hasReplies : {
        type: Boolean,
        default: false 
    },
    upvotes: [
        Schema.Types.ObjectId
    ],
    userName: {
        type: String,
        required: true
    },

    userImg: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }


    
    
    
})

const Comment = mongoose.model("Comments", CommentSchema)

module.exports = Comment