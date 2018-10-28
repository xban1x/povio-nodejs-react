const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).json({ err: 'No Authorization header was found' });
  }
  const [scheme, token] = (parts = req.headers.authorization.split(' '));
  if (parts.length !== 2 || !/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .json({ err: 'Format is Authorization: Bearer [token]' });
  }
  try {
    req.user = jwt.verify(token, sails.config.secret);
    next();
    return;
  } catch (err) {
    err = 'Invalid Token';
    return res.status(401).json({ err });
  }
};
