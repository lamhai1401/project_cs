const users       = require('../../models/users');
const check_role  = require('../roles/check_role');
const jwt         = require('../../util/jwt');

function list(token, manager_role_detail_code) {
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

    const user_list = await users.find();
    if(!user_list[0]) {
      return reject('Database error');
    }
    user_list.shift();
    resolve (user_list);
  })
};

module.exports = list;