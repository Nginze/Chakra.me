const { Router } = require("express");
const router = Router();
const {
  createMessage,
  getConversationMessages,
} = require("../controllers/messageController");

router.post("/", createMessage);
router.get("/:conversationId", getConversationMessages);

module.exports = router;
