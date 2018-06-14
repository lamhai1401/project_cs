const users       = require('../../models/users');
const hash        = require('../../util/hash').hash;
const jwt         = require('../../util/jwt');
const check_role  = require('../roles/check_role');

function reset_password(object, token, manager_role_detail_code) {
  return new Promise( async(resolve, reject) => {

    // get manager role id
    token = await jwt.verifyToken(token);
    if(token == 'jwt expired') {
      return reject('Log in again');
    }
    const manager_role_type = token.role_type;

    // check permission
    const isRightRole = await check_role(manager_role_type, manager_role_detail_code);
    if( isRightRole != true ) {
      return reject(isRightRole);
    };
    // find user
    const user = await users.findOne({email: object.email});
    if(!user) {
      return reject('Invalid user email');
    };
    // hash new password
    const hashPassword  = await hash(object.new_password);
    user.password       = hashPassword;
    user.token          = await jwt.createToken({email: object.email, password: object.new_password, role_type: user.role_type});
    user.save();

    resolve(user);
  });
};

module.exports = reset_password;