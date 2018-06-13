const roles       = require('../../models/roles');
const string      = require('../../util/string');
const roles_code  = require('../../models/roles_code');
const check_role  = require('./check_role');

// truyền vào role type, mỗi khi tạo 1 role detail mới cho bất kỳ role nào thì sẽ tự động push vào role của admin
async function roles_detail_create(object, manager_role_id, manager_role_detail_code) {
  return await new Promise( async(resolve, reject) => {
    // check role
    const isRightRole = await check_role(manager_role_id, manager_role_detail_code);
    if( isRightRole != true ) {
      return reject(isRightRole);
    };

    // format
    object.type               = string.createcode(object.type);
    object.code               = string.createcode(object.code);
    object.roles_detail_name  = string.capitalize(object.roles_detail_name);

    // find role you want to push a new role details
    const curr_role = await roles.findOne({type: object.type});
    if(!curr_role || curr_role.status == 0) {
      return reject('Invalid role type or this role was disabled. Try again');
    };
    const new_role_detail = {
      status: '1',
      roles_detail_name: object.roles_detail_name,
      code: object.code,
    };

    // check role detail is existance or not
    const curr_role_detail = curr_role.roles_detail.find(detail => detail.code === new_role_detail.code || detail.roles_detail_name === new_role_detail.roles_detail_name);
    if (curr_role_detail) {
      return reject('This role already has this role detail');
    }

    // push a new role detail
    curr_role.roles_detail.push(new_role_detail);
    curr_role.updated_at = Date.now();
    curr_role.save();

    // automatic push a new role detail to admin role
    if (curr_role.type != 'ADMIN') {
      const admin_role = await roles.findOne({type: 'ADMIN'});
      const admin_curr_role_detail = admin_role.roles_detail.find(detail => detail.code === new_role_detail.code || detail.roles_detail_name === new_role_detail.roles_detail_name);
      if (admin_curr_role_detail) {
        return resolve(curr_role);
      }
      else {
        admin_role.roles_detail.push(new_role_detail);
        admin_role.updated_at = Date.now();
        admin_role.save();
        return resolve(curr_role);
      };
    };

    // thêm một role code mới vào data cho mục đích check role
    const new_role_code = {
      name: object.roles_detail_name,
      code: object.code
    }
    roles_code.create(new_role_code);
    resolve(curr_role);
  });
};

module.exports = roles_detail_create;