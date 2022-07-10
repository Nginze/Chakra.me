const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport')
const User = require('../models/User.js')
const scopes = ['identify', 'email', 'guilds', 'guilds.join'];
require('dotenv').config()

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: scopes
},
(accessToken, refreshToken, profile, done) => {
    User.findOne({thirdPartyId: profile.id})
        .populate(['posts', 'storyInbox', 'followers', 'following'])
        .populate({path: 'storyInbox', populate: {path: 'userId'}})
        .then((currentUser) => {
            if(currentUser){
                done(null, currentUser)
            }
            else{
                new User({
                    thirdPartyId: profile.id,
                    userName: profile.username,
                    imgUrl: profile.avatar
                
                })
                    .save()
                    .then((newUser) => {done(null, newUser)})
            }
        })
}));


passport.serializeUser((user,done) =>{
    done(null, user._id)
})

passport.deserializeUser( async (userId, done) =>{
    const user = await User.findOne({_id:userId })
                            .populate(['posts', 'storyInbox', 'followers', 'following'])
                            .populate({path: 'storyInbox', populate: {path: 'userId'}})
    done(null, user)
})