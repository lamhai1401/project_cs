const users       = require('../../models/users');
const roles       = require('../../models/roles');
const check_role  = require('../roles/check_role');
const jwt         = require('../../util/jwt');
const string      = require('../../util/string');

function user_change_role(object, token, manager_role_detail_code) {
  return new Promise( async(resolve, reject) => {

    // get manager role id
    token = await jwt.verifyToken(token);
    if(token == 'jwt expired') {
      return reject('Log in again');
    }
    const manager_role_type = token.role_type;

    // check role
    const isRightRole = await check_role(manager_role_type, manager_role_detail_code);
    if( isRightRole != true ) {
      return reject(isRightRole);
    }
    
    object.role_type = string.createcode(object.role_type);

    // check existing role
    const role = await roles.findOne({type: object.role_type});
    if(!role) {
      return reject('Invalid role type');
    };

    // check existing email to change
    const user = await users.findOne({email: object.email});
    if(!user) {
      return reject('Can not find email to change role');
    };

    // give a user to new role
    if (user.role_type == role.type) {
      return reject('This user already has this type')
    }
    else {
      user.role_type = role.type;
    };
    user.save();

    resolve(user);
  });
};

module.exports = user_change_role;