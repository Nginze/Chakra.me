const mongoose = require('mongoose')
const {Schema} = mongoose;

const CommunitySchema = new Schema({
    communityName: {
        type: String, 
        required: true
    },
    communityDesc: {
        type: String,
        required: true
    },
    communityIcon: {
        type: String,

    },
    communityBanner: {
        type: String,
    },
    communityBannerBlurred: {
        type: String
    },
    communityGuidelines: {
        type: String
    },
    admins: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }],
    members : [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    timeStamp: {
        type: Date,
        default: Date.now
    }
    
})

const Community = mongoose.model("Communities", CommunitySchema)

module.exports = Community