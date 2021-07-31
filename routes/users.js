var express = require('express');
var router = express.Router();

const env = require('dotenv').config();
const {User} = require('../models');

/* GET users listing. */
router.post('/',  function (req, res, next) {

});

router.post('/addUser', async function (req, res, next) {
    // res.send('user route');
    const {name,email} = req.body.params;
    console.log(name,email);
    try{
        const user =  await User.create({name,email})
        res.send(user);
    }catch (err){
        console.log(err);
    }
});

module.exports = router;
