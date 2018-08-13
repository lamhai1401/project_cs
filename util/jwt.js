const jwt = require('jsonwebtoken');
const KEY = 'q225234454>>*(&*^&%^*%@!651d.0g654gd8fh/97t83AGDHGNNGF4t53er1df.b0fg2.h1e89t';

function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: '2 hours'}, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, KEY, (err, payload) => {
      if(err) return reject(err);
      resolve(payload);
    });
  });
}

function verifyTokenWithKey(token, key) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, payload) => {
      if(err) return reject(err);
      resolve(payload);
    });
  });
}

function unLimitTokenWithKey(payload, KEY1) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, KEY1, {algorithm: 'HS256'}, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}

module.exports = {
  createToken: createToken,
  verifyToken: verifyToken,
  verifyTokenWithKey: verifyTokenWithKey
};

const payload = {
  email: "support@kryptono.exchange",
  password: "admin"
};

// verifyTokenWithKey("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cHBvcnRAa3J5cHRvbm8uZXhjaGFuZ2UiLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNTM0MTU4ODU5fQ.3nuJz8NeyxMHvD2Wj8wJWPqqZOnQf8y97qK49oPQAec", "14011994aA**..")
// .then(token => console.log(token));