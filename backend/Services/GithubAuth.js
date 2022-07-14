const passport = require("passport");
var GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User.js");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ thirdPartyId: profile.id })
        .populate(["posts", "storyInbox", "followers", "following"])
        .populate({ path: "storyInbox", populate: { path: "userId" } })
        .then(currentUser => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({
              thirdPartyId: profile.id,
              userName: profile.username,
              imgUrl: profile.photos[0].value,
            })
              .save()
              .then(newUser => {
                done(null, newUser);
              });
          }
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findOne({ _id: userId })
    .populate(["posts", "storyInbox", "followers", "following"])
    .populate({ path: "storyInbox", populate: { path: "userId" } });
  done(null, user);
});
