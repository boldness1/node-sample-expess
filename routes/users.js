var express = require('express');
var router = express.Router();

const userService = require('../services/Users/userService')
/* GET users listing. */
router.post('/',  function (req, res, next) {

});

router.post('/add', async function (req, res, next) {
    // res.send('user route');
    const {name,email,password,company} = req.body;

    const userCreated = await userService.addUser(name,email,password,company);

    res.send(userCreated);

});

module.exports = router;
