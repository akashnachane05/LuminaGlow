const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      req.user = decoded; // Add the decoded token to the request object
      next();
  });
};

module.exports = verifyToken;
