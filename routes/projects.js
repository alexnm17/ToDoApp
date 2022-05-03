var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//Models
var Project = require('../models/project.js');
var db = mongoose.connection;

const fetchuser = require("../Middleware/fetchuser");

router.post('/', fetchuser, function (req, res) {
    console.log(req);
    Project.create(req.body, function (err, taskinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  });

router.get("/", fetchuser, async (req, res) => {
  try {
      const project = await Project.find();
      res.send(project);
  } catch (error) {
      res.send(error);
  }
});

router.get('/:id', fetchuser, function (req, res) {
  Project.findById(req.params.id, function (err, projectinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(projectinfo);
  });
});

/*Update project*/
router.put("/:id", fetchuser, async (req, res) => {
  try {
      console.log(req.body);
      const project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          req.body
      );
      res.send(project);
  } catch (error) {
      res.send(error);
  }
});


/*Delete project*/
router.delete("/:id", fetchuser, async (req, res) => {
  try {
      const project = await Project.findByIdAndDelete(req.params.id);
      res.send(project);
  } catch (error) {
      res.send(error);
  }
});


module.exports = router;