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

router.post('/notify', async function (req, res, next) {
    // res.send('user route');
    // const {user_id} = req.params;
    let user_id = req.user.user_id;
   res.send( await userService.pushNotification(user_id));

});

module.exports = router;
