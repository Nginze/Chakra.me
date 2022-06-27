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
       
        User.findOne({thirdPartyId: profile.id}).populate(['posts', 'storyInbox']).populate({path: 'storyInbox', populate: {path: 'userId'}})
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
    done(null, user)
})

passport.deserializeUser((user, done) =>{
    done(null, user)
})