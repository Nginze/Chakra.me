const Notification = require('../models/Notification')


const getNotificationsById = (req, res) => {
 
    Notification.find({userId: req.params.id}).populate([ 'causerId']).sort({timeStamp: -1}).limit(5)
        .then((notifications) => {
            res.status(200).json(notifications)
        })

}


const createNotification = (req, res) => {
    console.log('creating notey')
    const newNotfication = new Notification({

        userId: req.body.userId,
        message:req.body.message,
        causerId: req.body.causerId

    })
    newNotfication.save()
    .then(res.status(200).json({success: true}))
}


module.exports = {getNotificationsById, createNotification}