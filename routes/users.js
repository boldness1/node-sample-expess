var express = require('express');
var router = express.Router();

const env = require('dotenv').config();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user route');
});

module.exports = router;
