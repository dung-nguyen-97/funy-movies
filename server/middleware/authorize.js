const { secret } = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = authorize;

function authorize(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ message: 'Unauthorized' })

  jwt.verify(token, secret , (err, user) => {
    if (err) return res.sendStatus(403)
    req.user_id = user.user_id;
    next()
  })
}

