const mongoose = require('mongoose')
const {Schema} = mongoose;

const StorySchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    stories:[ {
        type: String
    }],
    timeStamp: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
   
})

const Story = mongoose.model("Story", StorySchema)

module.exports = Story