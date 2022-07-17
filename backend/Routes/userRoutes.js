const { Router } = require("express");
const router = Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  res.status(200).json({
    isAuth: req.isAuthenticated(),
    message: req.isAuthenticated()
      ? "Currently authenicated"
      : " Currently unauthenticated",
    user: req.user,
  });
});

router.get("/all", (req, res) => {
  User.find()
    .populate(["posts", "followers", "following"])
    .then(users => {
      res.status(200).json(users);
    });
});

router.get("/logout", (req, res) => {
  req.logOut(() => req.session.destroy());

  res.status(200).json({
    isAuth: req.isAuthenticated(),
    message: req.isAuthenticated()
      ? "Currently authenicated"
      : " Currently unauthenticated",
  });
});

router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate(["posts", "followers", "following"])
    .then(user => {
      res.json(user);
    });
});

router.post("/follow", (req, res) => {
  console.log("hit");
  User.updateOne(
    { _id: req.body.userId },
    { $addToSet: { followers: req.body.followerId } }
  ).then(() => {
    User.updateOne(
      { _id: req.body.followerId },
      { $addToSet: { following: req.body.userId } }
    ).then(() => {
      console.log("followers and following updated");
      res.send("user followed");
    });
  });
});

router.get("/follow/:id/check/", async (req, res) => {
  const { followers } = await User.findOne({ _id: req.params.id });
  res.status(200).json({ isFollowing: followers.includes(req.query.user) });
});

router.get("/search/users", async (req, res) => {
  const q = req.query.q.charAt(0).toUpperCase() + req.query.q.slice(1);
  console.log(q);
  const docs = await User.find({
    userName: {
      $regex: new RegExp(q),
    },
  });
  res.status(200).json(docs);
});

router.put("/:id/changeDetails", async (req, res) => {
  try {
    if (req.body.imgbase64) {
      const result = await cloudinary.uploader.upload(req.body.imgbase64);
      console.log(result);
      await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            userName: req.body.userName,
            bio: req.body.bio,
            imgUrl: result.secure_url,
          },
        }
      );
    } else {
      await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            userName: req.body.userName,
            bio: req.body.bio,
          },
        }
      );
    }
    res.status(200).json({ sucessful: true });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
