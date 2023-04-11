const jwt = require('jsonwebtoken');
const { secret} = require('../config.json');

function generateAccessToken(id) {
  return jwt.sign(id, secret, { expiresIn: '7d' });
}

module.exports = generateAccessToken;