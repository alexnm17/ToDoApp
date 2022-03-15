var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//Models
var CollectionTask = require('../models/collectionTask.js');
var db = mongoose.connection;

router.post('/', function (req, res) {
    console.log(req);
    CollectionTask.create(req.body, function (err, taskinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  });

router.get("/", async (req, res) => {
  try {
      const collectionTask = await CollectionTask.find();
      res.send(collectionTask);
  } catch (error) {
      res.send(error);
  }
});

/*Update collectionTask*/
router.put("/:id", async (req, res) => {
  try {
      const collectionTask = await CollectionTask.findOneAndUpdate(
          { _id: req.params.id },
          req.body
      );
      res.send(collectionTask);
  } catch (error) {
      res.send(error);
  }
});


/*Delete collectionTask*/
router.delete("/:id", async (req, res) => {
  try {
      const collectionTask = await CollectionTask.findByIdAndDelete(req.params.id);
      res.send(collectionTask);
  } catch (error) {
      res.send(error);
  }
});


module.exports = router;