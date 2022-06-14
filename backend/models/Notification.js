const mongoose = require('mongoose')
const {Schema} = mongoose;

const NotificationSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    causerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    message:{
        type: String,
        required: true
    },

    hasRead: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
   
})

const Nofification = mongoose.model("Notification", NotificationSchema)

module.exports = Nofification