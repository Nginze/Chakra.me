const mongoose = require('mongoose')
const {Schema} = mongoose;

const StorySchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    imageUrls:[ {
        type: String
    }],
    timeStamp: {
        type: Date,
        default: Date.now
    }
   
})

const Story = mongoose.model("Story", StorySchema)

module.exports = Story