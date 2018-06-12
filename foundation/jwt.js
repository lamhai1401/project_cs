const jwt = require('jsonwebtoken');
const KEY = 'q225234454>>*(&*^&%^*%@!651d.0g654gd8fh/97t83AGDHGNNGF4t53er1df.b0fg2.h1e89t';

async function createToken(payload) {
  try {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: '2 days'}, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
    return token;
  }
  catch(err) {
    return err.message;
  }
};

async function verifyToken(token) {
  try {
    const payload = await new Promise((resolve, reject) => {
      jwt.verify(token, KEY, (err, payload) =>{
        if (err) return reject(err);
        resolve(payload);
      });
    });
    return payload;
  }
  catch(err) {
    return err.message;
  };
};


module.exports = {
  createToken,
  verifyToken
};