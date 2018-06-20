const users = require('../../models/users');

module.exports = (email, obj = {}) => {
  return new Promise((resolve, reject) => {
    users.findOneAndUpdate({email: email}, obj, {new: true}, (err, user) => {
      if (err || !user) return reject(err);
      resolve(user);
    });
  });
}
