require('dotenv').config()
const {Router} = require('express')
const router = Router()
const passport = require('passport')
require('../Services/GoogleAuth')


router.get('/google', passport.authenticate('google', {scope: ['profile']}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URI,
    failureRedirect: '/failure'
}))

module.exports = router