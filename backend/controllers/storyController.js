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
       

       console.log(result1)
       console.log(result2)
       console.log(result3)

        
        
        // if(result.width < 520)
        // {
        //     result.secure_url = `http://res.cloudinary.com/chakra-me/image/upload/w_1000,h_400,c_pad,b_auto/v${result.version}/${result.public_id}.${result.format}`
        // }
        // else{
        //     result.secure_url = `http://res.cloudinary.com/chakra-me/image/upload/w_520,c_fill/v${result.version}/${result.public_id}.${result.format}`
        // }
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