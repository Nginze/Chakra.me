require('dotenv').config()
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport')
const User = require('../models/User.js')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
       
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
                        userName: profile.given_name,
                        imgUrl: profile.picture
                       
                    })
                        .save()
                        .then((newUser) => {done(null, newUser)})
                }
            })
       
        
  }
));

passport.serializeUser((user,done) =>{
    done(null, user._id)
})

passport.deserializeUser( async (userId, done) =>{
    const user = await User.findOne({_id:userId }).populate(['posts', 'storyInbox', 'followers', 'following']).populate({path: 'storyInbox', populate: {path: 'userId'}})
    done(null, user)
})