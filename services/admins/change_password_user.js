const users = require('../../models/users');
const hash  = require('../../util/hash').hash;

function change_password(object, token, manager) {
  return new Promise(async (resolve, reject) => {

    const email = manager.email;

    const user = await users.findOne({email: email});
    if(!user) {
      return reject('Invalid email');
    };

    // avoid old token 
    if(token != user.token) {
      return reject('Log in again');
    };

    // hash password and create new token with this
    const hashPassword      = await hash(object.password);
    const new_token         = await jwt.createToken({email: email, password: object.password});
    user.password           = hashPassword;
    user.token              = new_token;
    user.updated_at         = Date.now();
    user.save();
    
    resolve(user);
  });
};

module.exports = change_password;