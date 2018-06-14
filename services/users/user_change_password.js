const users = require('../../models/users');
const hash  = require('../../util/hash').hash;
const jwt   = require('../../util/jwt');

function change_password(object, token2) {
  return new Promise(async(resolve, reject) => {

    // get manager role id
    const token = await jwt.verifyToken(token2);
    if(token == 'jwt expired') {
      return reject('Log in again');
    }
    const email = token.email;

    const user = await users.findOne({email: email});
    if(!user) {
      return reject('Invalid email');
    };

    // avoid old token 
    if(token2 != user.token) {
      return reject('Log in again');
    }

    // hash password and create new token with this
    const hashPassword      = await hash(object.password);
    const new_token         = await jwt.createToken({email: email, password: object.password, role_type: user.role_type});
    user.password           = hashPassword;
    user.token              = new_token;
    user.updated_at         = Date.now();
    user.save();
    
    resolve(user);
  });
};

module.exports = change_password;