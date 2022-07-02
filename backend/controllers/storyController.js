const Story = require("../models/Story")
const User = require("../models/User")
const cloudinary = require('../Utils/cloudinary')

const createStory = async (req, res) => {
    
    if(req.body.imgbase64){
        result = await cloudinary.uploader.upload(req.body.imgbase64)
        const savedStory = await Story.updateOne({userId: req.body.userId}, { $push: { stories: result.secure_url } },{upsert: true})
        const {followers} = await User.findOne({_id: req.body.userId})
        followers.map(async follower => {
            await User.updateOne(
                    {_id: follower._id}, 
                    {$addToSet: {storyInbox: savedStory.upsertedId}}
            )
        } )
    }
    if(req.body.message){
        const savedStory = await Story.updateOne({userId: req.body.userId}, { $push: { stories: req.body.message } }, {upsert: true})
        const {followers} = await User.findOne({_id: req.body.userId})
        followers.map(async follower => {
            await User.updateOne(
                    {_id: follower._id}, 
                    {$addToSet: {storyInbox: savedStory.upsertedId}}
            )
        } )
    }
    

    res.send({done: true})
}

const getStoryById = async(req, res) => {
    const story = await Story.findOne({userId: req.params.id})
    res.status(200).json(story)
}

module.exports = {createStory, getStoryById}