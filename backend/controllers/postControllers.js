const Post = require('../models/Post')
const User = require('../models/User')
const cloudinary = require('../Utils/cloudinary')

const getPosts = (req, res) => {

    Post.find().sort({timeStamp: -1})
        .then((posts) => {
            res.status(200).json(posts)
        })
}

const createPost = (req, res) => {

    if(req.body.imgbase64)
    {
        cloudinary.uploader.upload(req.body.imgbase64)
        .then((result) => {
            console.log(result)
            if(result.width < 520)
            {
                result.secure_url = `http://res.cloudinary.com/chakra-me/image/upload/w_1000,h_400,c_pad,b_auto/v${result.version}/${result.public_id}.${result.format}`
            }
            else{
                result.secure_url = `http://res.cloudinary.com/chakra-me/image/upload/w_520,c_fill/v${result.version}/${result.public_id}.${result.format}`
            }
            const newPost = new Post({
                message: req.body.message, 
                userId: req.body.userId,
                userImg: req.body.userImg,
                imgUrl: result.secure_url,
                userName: req.body.userName
            })
            newPost.save()
                .then((post) => {
                    User.updateOne({_id: post.userId}, {$addToSet: {posts: post._id}}).then(() => console.log('added post to user'))
                })
                .then(res.status(200).json({sucess: true}))

        } )
    }
    else{

        const newPost = new Post({
            message: req.body.message, 
            userId: req.body.userId,
            userImg: req.body.userImg,
            userName: req.body.userName
        })
        newPost.save()
            .then((post) => {
                User.updateOne({_id: post.userId}, {$addToSet: {posts: post._id}}).then(() => console.log('added post to user'))
            })
             .then(res.status(200).json({sucess: true}))

    }
    
   
    
}

const getPostById = (req, res) => {
    Post.find({userId: req.params.id}).sort({timeStamp: -1})
        .then((posts) => {
            res.status(200).json(posts)
    })
}



const postLike = (req, res) => {
  
    Post.updateOne(
        {_id: req.body.postId}, 
        {$addToSet: {upvotes: req.body.userId}}
    ).then(console.log("done"))
}
module.exports = {getPosts, createPost, getPostById, postLike}