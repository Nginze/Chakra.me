const mongoose = require('mongoose')
const {Schema} = mongoose;

const PostSchema = new Schema({
    message:{
        type: String,

    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    userName: {
        type: String,
        required: true
    },

    userImg: {
        type: String,
        required: true
    },

    imgUrl: {
        type: String
    },

    upvotes: [
       Schema.Types.ObjectId
    ],

    communityId: {
        type: Schema.Types.ObjectId,
        default: null
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
    
})

const Post = mongoose.model("Posts", PostSchema)

module.exports = Post