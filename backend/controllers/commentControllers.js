const Comment = require("../models/Comment");

const getComments = (req, res) => {
  Comment.find({ postId: req.params.postId }).then(comments => {
    res.status(200).json(comments);
  });
};

const createComment = (req, res) => {
  const newComment = new Comment({
    message: req.body.message,
    userId: req.body.userId,
    userImg: req.body.userImg,
    userName: req.body.userName,
    parentId: req.body.parentId,
    postId: req.body.postId,
    replier: req.body.replier,
  });
  newComment.save().then(res.status(200).json({ success: true }));
};

const getReplies = (req, res) => {
  Comment.find({ parentId: req.params.parentId }).then(comment => {
    res.status(200).json(comment);
  });
};

const postLike = (req, res) => {
  Comment.updateOne(
    { _id: req.params.commentId },
    { $addToSet: { upvotes: req.body.userId } }
  ).then(console.log("done"));
};
module.exports = { getComments, createComment, getReplies, postLike };
