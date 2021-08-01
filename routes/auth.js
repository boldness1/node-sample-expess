var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt");
const {User} = require("../models");
const authService = require("../services/Auth/authService");


router.post('/login', async function (req, res, next) {

    const {email,password} = req.body;

    try{
        const potentialUser = await User.findOne({
            where: {
                email: email,
            },
        });

        if(potentialUser){

            let isPasswordValid = bcrypt.compareSync(password, potentialUser.password);

            if(isPasswordValid){
               res.send(authService.loginUser(potentialUser));
            }

        }

    }catch (err){
        console.log(err);
    }

    return res.send({
        error:'Auth Failed..',
        message:'Some error happened..'
    })

});

router.post('/logout', async function (req, res, next) {


});



module.exports = router;