const users = require('../../models/users');

module.exports = (filter = {}) => {
  return new Promise((resolve, reject) => {
    const user = users.find({});
    user.sort({email: -1});
    user.select('name email status last_login created_at');
    user.exec((err, users) => {
      if (err) reject(err);
      resolve(users);
    });
  })
};