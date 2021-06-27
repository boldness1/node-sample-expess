
const env = require('dotenv').config().parsed;

const authUser = function (req, res, next) {
    // console.log('test');
    env.ACCESS_TOKEN === req.header('ACCESS_TOKEN') ? next() : res.send('Not Authorized!');
}

module.exports = authUser;
