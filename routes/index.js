var express = require('express');
var router = express.Router();
const fetchuser = require("../Middleware/fetchuser");
/* GET home page. */
router.get('/',fetchuser, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
