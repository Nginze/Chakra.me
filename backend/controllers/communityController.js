const Community = require('../models/Community')
const Post = require('../models/Post')

const createCommunity = async (req, res) => {
    console.log(req.body)
    const newCommunity = new Community({
        communityName: req.body.communityName,
        communityDesc: req.body.communityDesc,
        communityIcon:'https://img.icons8.com/fluency/48/undefined/doge.png',
        communityBanner: 'https://res.cloudinary.com/chakra-me/image/upload/v1655306195/default_wallpaper_bcuctp.webp',
        members: [req.body.userId],
        admins: [req.body.userId]

    })

    await newCommunity.save()

    
}

const getTopCommunities = async(req, res) => {

}

const getAllCommunities = async(req, res) => {

}

const getCommunityPosts = async(req, res) => {
    console.log(req.query.sort)
    if(req.query.sort == 'top')
    {
        const posts = await Post.find({communityId: req.params.id})
        res.status(200).json(posts)
    }

    if(req.query.sort == 'recent')
    {
        const posts = await Post.find({communityId: req.params.id})
        res.status(200).json(posts)
    }
  
}

const getCommunityById = async(req, res) => {

    const community = await Community.findOne({_id: req.params.id}).populate(['admins', 'members'])
    res.status(200).json(community)
}


const joinCommunityById = async (req, res) => {

    await Community.updateOne(
        {_id: req.params.id}, 
        {$addToSet: {members: req.body.userId}}
    )
    
}

const removeMember = async (req, res) => {
    await Community.updateOne({_id: req.params.id}, { $pull: { members: req.body.userId } })
}

const validateMember = async (req, res) => {
    const {members} =  await Community.findOne({_id:req.params.id }); 
    res.status(200).json({isMember: members.includes(req.query.user)})
}
module.exports = {createCommunity, getTopCommunities, getAllCommunities, getCommunityPosts, getCommunityById, joinCommunityById, validateMember, removeMember}