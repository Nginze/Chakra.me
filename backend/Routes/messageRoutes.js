const { Router } = require("express");
const router = Router();
const {
  createMessage,
  getConversationMessages,
  readAllMessages
} = require("../controllers/messageController");

router.post("/", createMessage);
router.get("/:conversationId", getConversationMessages);
router.put("/readAll/:conversationId", readAllMessages);
module.exports = router;
