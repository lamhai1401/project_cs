const users       = require('../../../models').users;
const jwt         = require('../../../methods').jwt;
const hash        = require('../../../methods').hash;
const check_role  = require('../../check_role');
const user_reset_password_code = require('../../roles/role_code').reset_password;

async function reset_password(object, user_role_id, user_role_detail_code) {
  return new Promise( async(resolve, reject) => {
    // check permission
    const isRightRole = await check_role(user_role_id, user_role_detail_code, user_reset_password_code);
    if( isRightRole != true ) {
      return reject(isRightRole);
    };
    // find user
    const user = await users.findOne({email: object.email});
    if(!user) {
      return reject('Invalid user email');
    };
    // hash new password
    const hashPassword =  await hash(object.password);
    user.password = hashPassword;
    user.save();
    return user;
  });
};

module.exports = reset_password;