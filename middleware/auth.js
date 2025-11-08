const jwt = require('jsonwebtoken');

// This middleware function protects routes
module.exports = function(req, res, next) {
  // 1. Get the token from the header
  // When we send a request from React, we'll add the token to a header named 'x-auth-token'
  const token = req.header('x-auth-token');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // The token is valid.
    // The 'decoded' payload includes the user object we added when we signed the token.
    // We add this user object to the request object ('req')
    // so our protected routes can access which user is making the request.
    req.user = decoded.user; 
    next(); // Move on to the next function (the route handler)
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
