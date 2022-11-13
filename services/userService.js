const { User } = require("../models/user.js"),
  bcrypt = require("bcryptjs");

const saveUser = async ({ username, password }, res) => {
  const user = new User({
    username,
    password: await bcrypt.hash(password, 10),
  });
  return await user.save().catch((error) => {
    res.status(400).json({
      message: "Registration error",
    });
  });
};

module.exports = {
  saveUser,
};
