const Story = require("../models/Story")
const User = require("../models/User")
const cloudinary = require('../Utils/cloudinary')

const createStory = async (req, res) => {
        let result1, result2, result3 = null
    
        if(req.body.imgbase64[0])
        {
            result1 = await cloudinary.uploader.upload(req.body.imgbase64[0])
        }
        if(req.body.imgbase64[1])
        {
            result2 = await cloudinary.uploader.upload(req.body.imgbase64[1])
        }
       if(req.body.imgbase64[2])
       {
            result3 = await cloudinary.uploader.upload(req.body.imgbase64[2])
       }
       
    const newStory = new Story({
        userId: req.body.userId,
        imageUrls: [result1?.secure_url, result2?.secure_url, result3?.secure_url]
    })

    const savedStory = await newStory.save()

    const {followers} = await User.findOne({_id: req.body.userId})

    followers.map(async follower => {
       await User.updateOne(
            {_id: follower._id}, 
            {$addToSet: {storyInbox: savedStory._id}}
        )
    } )

    res.send({done: true})
}


module.exports = {createStory}