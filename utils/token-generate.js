const jwt = require('jsonwebtoken');
const { config } = require('../config/constants');

const JWT_EXPIRE = config.JWT_EXPIRE ? parseInt(config.JWT_EXPIRE) : 60;
const JWT_SECRET_KEY = config.JWT_SECRET_KEY;

function validateSecret(secret, type) {
  if (!secret) {
    throw new Error(`Missing JWT secret for ${type}`);
  }
}

function generateUserToken(id) {
  validateSecret(JWT_SECRET_KEY, "USER");
  const expirationTimeInSeconds = JWT_EXPIRE * 60;
  const payload = {
    id: id
  };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: expirationTimeInSeconds });
}

function validRefreshToken(token) {
  const payload = jwt.decode(token);
  return payload;
}

module.exports = {
  generateUserToken,
  validRefreshToken
};
