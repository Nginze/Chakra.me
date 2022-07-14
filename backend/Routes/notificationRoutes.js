const { Router } = require("express");
const router = Router();
const {
  getNotificationsById,
  createNotification,
} = require("../controllers/notificationController");

router.get("/:id", getNotificationsById);
router.post("/", createNotification);

module.exports = router;
