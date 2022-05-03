var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const bcrypt = require('bcrypt');
//Models
var Session = require('../models/session.js');
var User = require('../models/user.js');
var db = mongoose.connection;


router.get('/:id', function (req, res) {
   Session.findById(req.params.id, function (err, info) {
     if (err) res.status(500).send(err);
     else res.status(200).json(info);
   });
 });

 router.delete("/:id", async (req, res) => {
   try {
       const task = await Session.findByIdAndDelete(req.params.id);
       res.send(task);
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
               message: "Incorrect User"
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
   // Crea nueva session
   Session.create(body, function (err,info) {
    if (err) res.status(500).send(err);
    else res.send(info);
  });
   })
  });

  
module.exports = router;