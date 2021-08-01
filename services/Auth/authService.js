const env = require('dotenv').config().parsed;
const jwt = require('jsonwebtoken');

function verifyAuth(access_token, api_key){
     if (!isApiKeyValid(api_key)){
         return {
             error:'Api Key Failed!',
             message:'Api key error.'
         };
     }

   return verifyUserToken(access_token)
}

function loginUser(user){
    let user_token = jwt.sign({ username: user.email, user_id: user.id}, env.ACCESS_SECRET, { expiresIn: '1d' });

     return {
         success:'Token Generated!',
         access_token:user_token,
     }
}

function logoutUser(){

}

function isApiKeyValid(api_key) {
    return env.API_KEY === api_key;
}

function verifyUserToken(access_token) {

    return jwt.verify(access_token, env.ACCESS_SECRET, (err, user) => {

        if(!access_token) {
            return {
                error: 'User Token Required',
                message: 'Auth Failed!'
            }
        }

        if (err) {
            return {
                error:'Authentication Filed by Service...',
                message:'Auth Failed!'
            };
        }

        return {
            success: true,
            message: 'User Verified!',
            user: user
        };

    });


}



module.exports = {verifyAuth, loginUser, logoutUser};