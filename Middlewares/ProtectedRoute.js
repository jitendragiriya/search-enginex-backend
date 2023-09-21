const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({
          message: "Access denied. Invalid token.", 
        });
    }

    req.user = user; // Store the user object in the request for use in protected routes
    next();
  });
}

module.exports = authenticateToken;
