const express = require ('express'),
    {userRegister, userLogin} = require('./userService.js');

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);

module.exports = {
    userRouter: router,
}
