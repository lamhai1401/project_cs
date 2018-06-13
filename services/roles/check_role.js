const roles = require('../../models/roles');
const roles_code  = require('../../models/roles_code');
const string = require('../../util/string');

// lấy user id từ token sau đó lọc ra role id, check role id xem có quyền đó ko, sau đó check xem activity code có đúng ko, tránh trường hợp query = postman
async function check(manager_role_id, manager_role_detail_code) {
  return new Promise( async(resolve, reject) => {
    //format
    manager_role_detail_code = string.createcode(manager_role_detail_code);
    // check user role
    const role = await roles.findOne({_id: manager_role_id});
    if (!role || role.status == 0) {
      return resolve('This role to do it is not existance/disable in your account');
    };

    const role_detail = role.roles_detail.find( role => role.code === manager_role_detail_code );
    if(!role_detail || role_detail.status == 0) {
      return resolve(`You dont have role or role detail to ${manager_role_detail_code} this`);
    };

    // check if this role is not existance in roles_code table, this role code was not created by admin.
    const role_code = await roles_code.findOne({code: manager_role_detail_code });
    if(!role_code) {
      return resolve(`Wrong role code`);
    }
    resolve(true);
  });
}

module.exports = check;