const express = require("express"),
  {
    getUserInfo,
    deleteUserProfile,
    changeUserPassword,
  } = require("../controllers/userController.js"),
  { auth } = require("../middleware/auth.js");

const router = express.Router();

// const asyncWrapper = (controller) => {
//     return (req, res, next) => controller(req, res, next).catch(next);
//   }

router.get("/me", auth, getUserInfo);

module.exports = {
  userRouter: router,
};
