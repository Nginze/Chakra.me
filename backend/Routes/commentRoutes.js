const { Router } = require("express");
const router = Router();
const {
  getComments,
  getReplies,
  createComment,
  postLike,
} = require("../controllers/commentControllers");

router.get("/:postId", getComments);
router.get("/r/:parentId", getReplies);
router.post("/", createComment);
router.post("/like/c/:commentId", postLike);

module.exports = router;
