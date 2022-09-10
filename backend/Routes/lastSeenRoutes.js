const { Router } = require("express");
const {
  getTimestamps,
  updateTimestamps,
} = require("../controllers/lastSeenController");
const router = Router();

router.get("/:userId", getTimestamps);
router.put("/:conversationId/:userId", updateTimestamps);
module.exports = router;
