const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }
    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id: decoded.userId };

    // call next middleware
    next();
  } catch (err) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

module.exports = auth;
