const users       = require('../../models/users');
const check_role  = require('../roles/check_role');
const jwt         = require('../../util/jwt');

function disable_user(object, token, manager_role_detail_code) {
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

    // check disabled admin type
    if(user.role_type == 'ADMIN' || user.role_type == manager_role_type) {
      return reject('You can not disabled ADMIN account or account has type like you');
    }

    // settting status of user = 0;
    user.status = 0;
    user.token = "";
    user.role_type = "";
    user.updated_at = Date.now();
    user.save();

    resolve(user);
  });
}

module.exports = disable_user;