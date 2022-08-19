const express = require ('express'),
    {getUserInfo} = require('./userInfoService.js'),
    {auth} = require('./middleware/auth.js');

const router = express.Router();

router.get('/me', auth, getUserInfo);


module.exports = {
    userInfoRouter: router,
}
