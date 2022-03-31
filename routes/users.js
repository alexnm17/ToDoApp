var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const bcrypt = require('bcrypt');

//Models
var User = require('../models/user.js');
var db = mongoose.connection;

router.post('/', function (req, res) {
    console.log(req);
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



router.post('/login', function (req, res) {
  let body = req.body;

  User.findOne({ email: body.email }, (erro, userDB)=>{
      if (erro) {
        return res.status(500).json({
           ok: false,
           err: erro
        })
     }
 // Verifica que exista un usuario con el mail escrita por el usuario.
    if (!userDB) {
       return res.status(400).json({
         ok: false,
         err: {
             message: "Incorrect User or Password"
         }
      })
    }
 // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
    if (! bcrypt.compareSync(body.password, userDB.password)){
       return res.status(400).json({
          ok: false,
          err: {
            message: "Incorrect User or Password"
          }
       });
    }
 // Devuelve ok
     res.json({
         ok: true,
         usuario: userDB
     })
 })
});


router.post('/register', function (req, res) {
  let body = req.body;
  let { email, password,username,rol} = body;
  let user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    rol
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