const jwt = require('jsonwebtoken'),
    {secretKey} = require('../secretKey.js');

const auth = (req, res, next) => {
  const  {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({ 'message': 'Please, provide authorization header' });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res.status(401).json({ 'message': 'Please, include token to request' });
  }

  try {
    const tokenPayload = jwt.verify(token, secretKey);
    req.user = {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
      name: tokenPayload.name
    }
    next();
  } catch (err) {
    return res.status(401).json({message: err.message});
  }

}

module.exports = {
  auth
}
