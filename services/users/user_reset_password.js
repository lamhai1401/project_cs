const users       = require('../../models/users');
const hash        = require('../../util/hash').hash;
const check_role  = require('../roles/check_role');

async function reset_password(object, manager_role_id, manager_role_detail_code) {
  return new Promise( async(resolve, reject) => {
    // check permission
    const isRightRole = await check_role(manager_role_id, manager_role_detail_code);
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
    user.token = "";
    user.save();
    return user;
  });
};

module.exports = reset_password;