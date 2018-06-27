const jwt = require('jsonwebtoken');
const KEY = 'q225234454>>*(&*^&%^*%@!651d.0g654gd8fh/97t83AGDHGNNGF4t53er1df.b0fg2.h1e89t';

function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: '2 hours'}, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, KEY, (err, payload) => {
      if(err) return reject(err);
      resolve(payload);
    });
  });
};

module.exports = {
  createToken,
  verifyToken
};