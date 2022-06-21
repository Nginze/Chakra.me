const Story = require("../models/Story")
const User = require("../models/User")


const createStory = async (req, res) => {
    console.log('hit')
    const newStory = new Story({
        userId: req.body.userId,
        imageUrl: 'https://images.pexels.com/photos/11491782/pexels-photo-11491782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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