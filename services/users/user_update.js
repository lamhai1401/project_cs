const users = require('../../models/users');
const jwt   = require('../../util/jwt');
const string= require('../../util/string');

// ko được đổi email và role
function update(object, token) {
  return new Promise( async (resolve, reject) => {
    
    // get manager role id
    token = await jwt.verifyToken(token);
    if(token == 'jwt expired') {
      return reject('Log in again');
    }

    const user = await users.findOne({email: token.email});
    
    // check valid email
    if(!user) {
      return reject('Invalid email');
    };

    // check disable email
    if(user.status == 0) {
      return reject('Your account was disabled');
    }

    // map new user to current user
    user.info.address     = object.address;
    user.info.passport    = object.passport;
    user.info.name        = await string.capitalize(object.name);
    user.display_name     = await string.capitalize(object.display_name);
    user.updated_at       = Date.now();
    // save
    user.save();

    resolve(user);
  });
};

module.exports = update;