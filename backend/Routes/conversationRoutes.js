const {Router} = require('express');
const router = Router();
const
 {getOneConversation, 
  getUserConversations, 
  createConversation
 } = require('../controllers/conversationController')

router.post("/", createConversation);
router.get("/:userId", getUserConversations);
router.get("/find/:userOne/:userTwo", getOneConversation);

module.exports = router;