const Community = require('../models/Community')
const Post = require('../models/Post')
const cloudinary = require('../Utils/cloudinary')

const createCommunity = async (req, res) => {
    console.log(req.body)
    const newCommunity = new Community({
        communityName: req.body.communityName,
        communityDesc: req.body.communityDesc,
        communityIcon:'https://img.icons8.com/fluency/96/undefined/doge.png',
        communityBanner: 'https://res.cloudinary.com/chakra-me/image/upload/v1655306195/default_wallpaper_bcuctp.webp',
        communityBannerBlurred: 'https://res.cloudinary.com/chakra-me/image/upload/w_1700,h_530,c_fill/e_blur:1000000000000/v1655306195/default_wallpaper_bcuctp.webp',
        members: [req.body.userId],
        admins: [req.body.userId]

    })

    const community = await newCommunity.save()
    
    res.json({_id: community._id})

    
}

const getTopCommunities = async(req, res) => {
    const communities = await Community.find({}).limit(15)

    res.status(200).json(communities)
}

const getAllCommunities = async(req, res) => {

}

const getCommunityPosts = async(req, res) => {
  
    console.log('hitting')
    if(req.query.sort == 'top')
    {
        const posts = await Post.find({communityId: req.params.id}).skip(req.query.page * 10).limit(10)
        console.log(posts)
        res.status(200).json({posts, cursor: parseInt(req.query.page) + 1})
    }

    if(req.query.sort == 'recent')
    {
        const posts = await Post.find({communityId: req.params.id}).skip(req.query.page * 10).limit(10)
        console.log(posts)
        res.status(200).json({posts, cursor: parseInt(req.query.page) + 1})
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
    res.json(null)
 
}

const updateCommunityById = async (req, res) => {

    console.log(req.body)
 
    if(req.body.imgbase64)
    {
        const result = await cloudinary.uploader.upload(req.body.imgbase64)
        console.log(result)
        await Community.updateOne(
            {_id: req.params.id},
            { "$set": { "communityName": req.body.communityName, "communityDesc": req.body.communityDesc, "communityGuidelines": req.body.communityGuidelines, "communityIcon": result.secure_url}}
        )

    }
    else{
        await Community.updateOne(
            {_id: req.params.id},
            { "$set": { "communityName": req.body.communityName, "communityDesc": req.body.communityDesc, "communityGuidelines": req.body.communityGuidelines}}
        )
    }

    res.json(null)
}

const removeMember = async (req, res) => {

    await Community.updateOne({_id: req.params.id}, { $pull: { members: req.body.userId } })
    res.json(null)
}

const validateMember = async (req, res) => {
    const {members, admins} =  await Community.findOne({_id:req.params.id }); 
    res.status(200).json({isMember: members.includes(req.query.user), isAdmin: admins.includes(req.query.user)})
}

const changeBanner = async (req, res) => {

    if(req.body.imgbase64)
    {
        const result = await cloudinary.uploader.upload(req.body.imgbase64)
        console.log(result)
        result.blurred_url = `http://res.cloudinary.com/chakra-me/image/upload/e_blur:1000000000000/w_1700,h_530,c_fill/v${result.version}/${result.public_id}.${result.format}`
        await Community.updateOne(
            {_id: req.params.id},
            { "$set": {  "communityBanner": result.secure_url, "communityBannerBlurred":result.blurred_url }}
        )

    }

    res.json(null)
}

module.exports = {createCommunity,
                 getTopCommunities, 
                 getAllCommunities, 
                 getCommunityPosts, 
                 getCommunityById, 
                 joinCommunityById, 
                 validateMember, 
                 removeMember, 
                updateCommunityById,
                changeBanner}