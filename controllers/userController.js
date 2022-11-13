const { User, userJoiSchema, passwordJoiSchema } = require("../models/user.js"),
  jwt = require("jsonwebtoken"),
  { saveUser } = require("../services/userService.js"),
  bcrypt = require("bcryptjs");

const secretKey = "AlwaysClose228";

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  await userJoiSchema.validateAsync({ username, password });
  const userExist = await User.findOne({ username });
  if (!userExist) {
    const user = await saveUser({ username, password }, res);
    const payload = { username: user.username, userId: user._id };
    const jwtToken = jwt.sign(payload, secretKey);
    return res.status(200).json({ user: user, jwt_token: jwtToken });
  } else {
    res.status(400).json({
      message: "This username already exist",
    });
  }
};

const loginUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (
    user &&
    (await bcrypt.compare(String(req.body.password), String(user.password)))
  ) {
    const payload = { username: user.username, userId: user._id };
    const jwtToken = jwt.sign(payload, secretKey);
    return res.status(200).json({ user: user, jwt_token: jwtToken });
  }
  return res.status(400).json({ message: "Not authorized" });
};

const getUserInfo = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user) {
    return res.json(user);
  }
  return res.status(400).json({
    message: "User did not find",
  });
};

const changeUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const selectUser = await User.findOne({ username: req.user.username });
  await passwordJoiSchema.validateAsync({ newPassword });
  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: "Please, provide all data",
    });
  }
  if (await bcrypt.compare(String(oldPassword), String(selectUser.password))) {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    User.findOneAndUpdate(
      { username: selectUser.username },
      { password: hashPassword }
    )
      .then(() => {
        return res.status(200).json({
          message: "Password changed successfully",
        });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    return res.status(400).json({
      message: "Old password is different",
    });
  }
};

module.exports = {
  userRegister: registerUser,
  userLogin: loginUser,
  getUserInfo,
};
