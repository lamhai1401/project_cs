const users = require('../../models/users');
const hash  = require('../../util/hash').hash;
const jwt   = require('../../util/jwt');
const string= require('../../util/string');

// ko được đổi email và role
function update(object) {
  return new Promise( async (resolve, reject) => {
    
    const user = await users.findOne({email: object.email});
    
    // check valid email
    if(!user) {
      return reject('Invalid email');
    };

    // map new user to current user
    user.info.address     = object.address;
    user.info.passport    = object.passport;
    user.info.name        = await string.capitalize(object.name);
    user.password         = await hash(object.password);
    user.display_name     = await string.capitalize(object.display_name);
    user.token            = await jwt.createToken({email: object.email, password: object.password});
    
    // save
    user.save();

    resolve(user);
  });
};

module.exports = update;