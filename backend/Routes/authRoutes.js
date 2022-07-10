require('dotenv').config()
const {Router} = require('express')
const router = Router()
const passport = require('passport')
require('../Services/GoogleAuth')
require('../Services/FacebookAuth')
require('../Services/GithubAuth')
require('../Services/DiscordAuth')

router.get('/google', passport.authenticate('google', {scope: ['profile']}))
router.get('/facebook', passport.authenticate('facebook'))
router.get('/github', passport.authenticate('github'))
router.get('/discord', passport.authenticate('discord'))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URI,
    failureRedirect: '/failure'
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: process.env.CLIENT_URI,
    failureRedirect: '/failure'
}))

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: process.env.CLIENT_URI,
    failureRedirect: '/failure'
}))

router.get('/discord/callback', passport.authenticate('discord', {
    successRedirect: process.env.CLIENT_URI,
    failureRedirect: '/failure'
}))

module.exports = router