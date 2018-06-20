const users       = require('../../models/users');

function enable_user(object) {
  return new Promise ( async(resolve, reject) => {
    
    // find user
    const user = await users.findOne({email: object.email});
    if(!user) {
      return reject('Invalid user email');
    };

    // settting status of user = 1;
    user.status = 1;
    user.updated_at = Date.now();
    user.save();

    resolve(user);
  });
}

module.exports = enable_user;