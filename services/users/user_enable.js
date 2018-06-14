const users       = require('../../models/users');
const check_role  = require('../roles/check_role');
const jwt         = require('../../util/jwt');

function enable_user(object, token, manager_role_detail_code) {
  return new Promise ( async(resolve, reject) => {

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

    // settting status of user = 1;
    user.status = 1;
    user.updated_at = Date.now();
    user.save();

    resolve(user);
  });
}

module.exports = enable_user;