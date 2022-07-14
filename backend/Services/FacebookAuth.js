const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User.js");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
