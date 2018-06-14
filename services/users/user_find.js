const users       = require('../../models/users');
const check_role  = require('../roles/check_role');
const jwt         = require('../../util/jwt');

function find(object, token, manager_role_detail_code) {
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

    const user = await users.findOne({email: object.email});
    if(!user) {
      return reject('Invalid email');
    }
    resolve (user);
  })
};

module.exports = find;