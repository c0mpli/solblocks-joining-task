const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    req.auth = { user: false };
    return next();
  }
  try {
    const verified = jwt.verify(token, process.env.jwtSecret);
    if (!verified) {
      req.auth = { user: false };
      return next();
    }
    req.auth = { user: true };
    return next();
  } catch {
    req.auth = { user: false };
    return next();
  }
}

module.exports = authMiddleware;
