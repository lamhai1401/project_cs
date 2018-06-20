const users = require('../../models/users');

module.exports = (object) => {
  return new Promise((resolve, reject) =>{
    users.findOne({email: object.email}, (err, user) => {
      if(err) return reject(err);
      resolve(user);
    });
  });
};
