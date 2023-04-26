require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
class JwtManager {
  constructor() {}

  generate(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256",
    });
  }

  verify(token) {
    if(!token) return false;
    return jwt.verify(token, JWT_SECRET, {
      algorithm: "HS256",
    });
  }
  decode(token) {
    if(!token) return false;
    return jwt.decode(token);
  }
}
const jwtManager = new JwtManager();
module.exports = jwtManager;