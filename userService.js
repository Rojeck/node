const {User} = require('./models/users.js'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    {secretKey} = require('./secretKey.js');

const registerUser = async (req, res, next) => {
    const { name, username, password } = req.body;
    const user = new User({
      name,
      username,
      password: await bcrypt.hash(password, 10)
    });
  
    user.save()
      .then(() => res.json({
        "message": "success"
      }))
      .catch(err => {
        next(err);
      });
  }
  
  const loginUser = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(String(req.body.password), String(user.password))) {
      const payload = { username: user.username, name: user.name, userId: user._id };
      const jwtToken = jwt.sign(payload, secretKey);
      return res.json({"message": "success", "jwt_token": jwtToken});
    }
    return res.status(400).json({'message': 'Not authorized'});
  }

module.exports = {
    userRegister: registerUser,
    userLogin: loginUser,
}
