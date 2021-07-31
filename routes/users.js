var express = require('express');
var router = express.Router();

const env = require('dotenv').config();
const {User, Case} = require('../models');

/* GET users listing. */
router.post('/',  function (req, res, next) {

});

router.post('/add', async function (req, res, next) {
    // res.send('user route');
    const {name,email,password,company} = req.body;

    try{
        const userExists = await User.findOne({
            where: {
                email: email
            },
        });

        if(userExists){
            res.send('User already exists!');
            return;
        }

    }catch (err){
        console.log(err);
    }

    try{
        const user =  await User.create({name,email,password,company})
        res.send(user);
    }catch (err){
        console.log(err);
    }

});

module.exports = router;
