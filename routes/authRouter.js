const express = require ('express'),
    {userRegister, userLogin} = require('../controllers/userController.js');

const router = express.Router();

const asyncWrapper = (controller) => {
    return (req, res, next) => controller(req, res, next).catch(next);
  }

router.post('/register', asyncWrapper(userRegister));
router.post('/login', asyncWrapper(userLogin));

module.exports = {
    authRouter: router,
}
