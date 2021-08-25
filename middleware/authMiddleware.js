const authService = require('../services/Auth/authService');

const authMiddleware = function (req, res, next) {
    // console.log('test');
    // env.ACCESS_TOKEN === req.header('ACCESS_TOKEN') ? next() : res.send('Not Authorized!');

    //User access token
    const access_token = req.header('ACCESS_TOKEN');

    //Node api key
    const api_key = req.header('API_KEY');

    let authVerified = authService.verifyAuth(access_token, api_key);

    if (authVerified.success && authVerified.user) {
        req.user = authVerified.user;
        next();
    } else
        res.send(authVerified);

}

module.exports = authMiddleware;
