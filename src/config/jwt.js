const jwt = require('jsonwebtoken')

const secret = process.env.SECRET;

const sign = payload => jwt.sign(payload, secret, { expiresIn: 86400 });
const verify = token => jwt.verify(token, secret);

module.exports = { sign, verify }