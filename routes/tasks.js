var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const fetchuser = require("../Middleware/fetchuser");
//Models
var Task = require('../models/task.js');
var db = mongoose.connection;

router.post('/', fetchuser, function (req, res) {
    console.log(req);
    Task.create(req.body, function (err, taskinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  });


router.get("/", fetchuser, async (req, res) => {
  try {
      const tasks = await Task.find();
      res.send(tasks);
  } catch (error) {
      res.send(error);
  }
});


/*Update task*/
router.put("/:id", fetchuser, async (req, res) => {
  try {
      const task = await Task.findOneAndUpdate(
          { _id: req.params.id },
          req.body
      );
      res.send(task);
  } catch (error) {
      res.send(error);
  }
});


/*Delete task*/
router.delete("/:id", fetchuser, async (req, res) => {
  try {
      const task = await Task.findByIdAndDelete(req.params.id);
      res.send(task);
  } catch (error) {
      res.send(error);
  }
});


module.exports = router;