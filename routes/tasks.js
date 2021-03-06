var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//Models
var Task = require('../models/task.js');
var db = mongoose.connection;

router.post('/', function (req, res) {
    console.log(req);
    Task.create(req.body, function (err, taskinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  });


router.get("/", async (req, res) => {
  try {
      const tasks = await Task.find();
      res.send(tasks);
  } catch (error) {
      res.send(error);
  }
});

router.get('/:id', function (req, res) {
  Task.findById(req.params.id, function (err, taskinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(taskinfo);
  });
});


/*Update task*/
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
      const task = await Task.findByIdAndDelete(req.params.id);
      res.send(task);
  } catch (error) {
      res.send(error);
  }
});


module.exports = router;