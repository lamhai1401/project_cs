const bcrypt = require('bcrypt');

function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hashPassword => resolve(hashPassword))
    .catch(err => reject(err));
  });
}

// trả về true | false
function compare(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}

module.exports = { 
  hash: hash,
  compare: compare 
};