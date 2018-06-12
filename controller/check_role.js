const roles = require('../models').roles;
const string = require('../methods').string;

// lấy user id từ token sau đó lọc ra role id, check role id xem có quyền đó ko, sau đó check xem activity code có đúng ko, tránh trường hợp query = postman
async function check(user_role_id, user_role_detail_code, role_code) {
  return new Promise( async(resolve, reject) => {
    //format
    user_role_detail_code = string.createcode(user_role_detail_code);
    
    // check user role
    const role = await roles.findOne({_id: user_role_id});
    if (!role || role.status == 0) {
      return resolve('Your current role is not existance/disable');
    };
    const role_detail = role.roles_detail.find( role => role.code === user_role_detail_code );
    if(!role_detail || role_detail.status == 0) {
      return resolve(`You dont have permission or role to ${user_role_detail_code} this`);
    };
    
    if(role_detail.code != role_code) {
      return resolve(`Wrong role code`);
    }
    resolve(true);
  });
}

module.exports = check;