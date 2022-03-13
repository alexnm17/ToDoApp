var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//Models
var Task = require('../models/task.js');
var db = mongoose.connection;

router.post('/', function (req, res) {
    Task.create(req.body, function (err, taskinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  });

  /* GET tasks listing */
/*  
router.get('/', function (res) {
  Task.find().exec(function(err, tasks) {
    if (err) res.status(500).send(err);
    else res.status(200).json(tasks);
  });
});
*/
router.get("/", async (req, res) => {
  try {
      const tasks = await Task.find();
      res.send(tasks);
  } catch (error) {
      res.send(error);
  }
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