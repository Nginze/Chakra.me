const { Router } = require("express");
const router = Router();
const {
  getNotificationsById,
  createNotification,
  markAsRead,
} = require("../controllers/notificationController");

router.get("/:id", getNotificationsById);
router.post("/", createNotification);
router.put("/:id/markAsRead", markAsRead);
module.exports = router;
