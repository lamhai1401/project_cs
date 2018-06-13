const users = require('../../models/users');
const check_role  = require('../roles/check_role');

async function delete_user(object, manager_role_id, manager_role_detail_code) {
  return new Promise ( async(resolve, reject) => {
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

    // settting status of user = 0;
    user.status = 0;
    user.token = "";
    user.role = "";
    user.save();
    resolve(user);
  });
}

module.exports = delete_user;