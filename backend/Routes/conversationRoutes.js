const { Router } = require("express");
const router = Router();
const {
  getOneConversation,
  getUserConversations,
  createConversation,
  getConversationById,
} = require("../controllers/conversationController");

router.post("/", createConversation);
router.get("/:id/byId", getConversationById);
router.get("/:userId", getUserConversations);
router.get("/find/:userOne/:userTwo", getOneConversation);

module.exports = router;
