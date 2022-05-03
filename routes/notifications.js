var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const bcrypt = require('bcrypt');

//Models
var Notification = require('../models/notification.js');
var db = mongoose.connection;

router.post('/', function (req, res) {
    console.log(req);
    let body = req.body;
    Notification.findOne({ receiver: body.receiver, sender: body.sender,type: body.type }, (erro, message)=>{
      if (erro) {
        return res.status(500).json({
           ok: false,
           err: erro
        })
     }
     if (message) {
      return res.status(400).json({
        ok: false,
        err: {
            message: "You have already sent a friend request to this person"
        }
      })
    }
  
    Notification.create(req.body, function (err, notificationinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
    })
  });

router.get("/", async (req, res) => {
  try {
      const notifications = await Notification.find();
      res.send(notifications);
  } catch (error) {
      res.send(error);
  }
});


/*Update notification*/
router.put("/:id", async (req, res) => {
  try {
      const notification = await Notification.findOneAndUpdate(
          { _id: req.params.id },
          req.body
      );
      res.send(notification);
  } catch (error) {
      res.send(error);
  }
});


/*Delete Notification*/
router.delete("/:id", async (req, res) => {
  try {
      const notification = await Notification.findByIdAndDelete(req.params.id);
      res.send(notification);
  } catch (error) {
      res.send(error);
  }
});


module.exports = router;

