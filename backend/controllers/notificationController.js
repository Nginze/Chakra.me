const Notification = require("../models/Notification");

const getNotificationsById = (req, res) => {
  Notification.find({ userId: req.params.id })
    .populate(["causerId"])
    .sort({ timeStamp: -1 })
    .limit(5)
    .then(notifications => {
      res.status(200).json(notifications);
    });
};

const createNotification = (req, res) => {
  console.log("creating notey");
  const newNotfication = new Notification({
    userId: req.body.userId,
    message: req.body.message,
    causerId: req.body.causerId,
  });
  newNotfication.save().then(res.status(200).json({ success: true }));
};
const markAsRead = async (req, res) => {
  try{
    await Notification.updateOne(
    { _id: req.params.id },
    {
      $set: {
        hasRead: true
      },
    }
  );
  res.status(200).json({succesful: true})
  }catch(err){
    res.status(500).json(err)
  }
};
module.exports = { getNotificationsById, createNotification, markAsRead };
