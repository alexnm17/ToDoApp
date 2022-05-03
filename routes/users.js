var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const bcrypt = require('bcrypt');

//Models
var User = require('../models/user.js');
var db = mongoose.connection;

router.post('/', function (req, res) {
    
    User.create(req.body, function (err, userinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  });

router.get("/", async (req, res) => {
  try {
      const users = await User.find();
      res.send(users);
  } catch (error) {
      res.send(error);
  }
});

router.get('/:mail', function (req, res) {
  mail =req.params.mail;
  console.log(mail);
  User.findOne({email: mail}, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(userinfo);
  });
});

/*Update user*/
router.put("/:id", async (req, res) => {
  try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.id },
          req.body
      );
      res.send(user);
  } catch (error) {
      res.send(error);
  }
});


/*Delete User*/
router.delete("/:id", async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.send(user);
  } catch (error) {
      res.send(error);
  }
});


router.post('/register', function (req, res) {
  let body = req.body;
  let { email, password,username,role} = body;
  let user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    role
  });
user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
         ok: false,
         err,
      });
    }
    res.json({
          ok: true,
          usuario: userDB
       });
    })
});


module.exports = router;