var express = require('express');
var router = express.Router();

const env = require('dotenv').config();
const {User} = require('../models');

/* GET users listing. */
router.post('/',  function (req, res, next) {
    // res.send('user route');
    //   const {name,email} = req.body.params;
    // console.log(name,email);
    // console.log(req.body.params);
});

router.get('/all',  async function (req, res, next) {
    const user =  await User.findAll();
    res.send(user);
});

module.exports = router;

