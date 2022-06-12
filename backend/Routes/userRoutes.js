const {Router} = require('express')
const { populate } = require('../models/User')
const router = Router()
const User = require('../models/User')

router.get('/',(req,res) =>{

    res.status(200).json({
        isAuth:req.isAuthenticated(),
        message:  req.isAuthenticated() ? 'Currently authenicated' : ' Currently unauthenticated',
        user: req.user
    })

})

router.get('/all', (req,res) => {
    User.find().populate('posts')
        .then((users) => {
            res.status(200).json(users)
        })
})

router.get('/logout', (req, res) => {
    
    req.logout()
    req.session.destroy()

    res.status(200).json({
        isAuth:req.isAuthenticated(),
        message:  req.isAuthenticated() ? 'Currently authenicated' : ' Currently unauthenticated',
    })
})

router.get('/:id', (req, res) =>{
    User.findOne({_id: req.params.id}).populate('posts')
        .then((user)=>{res.json(user)})
})

router.post('/follow', (req, res) => {
    console.log('hit')
    User.updateOne({_id: req.body.userId},{$addToSet: {followers: req.body.followerId}})
        .then(() => {
            User.updateOne({_id: req.body.followerId}, {$addToSet: {following: req.body.userId}}).then(() => console.log('followers and following updated'))
        })

})
module.exports = router