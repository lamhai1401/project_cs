// const roles       = require('../../models/roles');
// const string      = require('../../util/string');
// const roles_code  = require('../../models/roles_code');
// const check_role  = require('./check_role');
// const jwt         = require('../../util/jwt');

// // truyền vào role type, mỗi khi tạo 1 role detail mới cho bất kỳ role nào thì sẽ tự động push vào role của admin
// function roles_detail_create(object, token, manager_role_detail_code) {
//   return new Promise( async(resolve, reject) => {

//     // get manager role id
//     token = await jwt.verifyToken(token);
//     if(token == 'jwt expired') {
//       return reject('Log in again');
//     }
//     const manager_role_type = token.role_type;

//     // check role
//     const isRightRole = await check_role(manager_role_type, manager_role_detail_code);
//     if( isRightRole != true ) {
//       return reject(isRightRole);
//     };

//     // format
//     object.type               = string.createcode(object.type);
//     object.roles_detail_code  = string.createcode(object.roles_detail_code);
//     object.roles_detail_name  = string.capitalize(object.roles_detail_name);

//     // check trong bảng role code coi có chưa
//     const ex_rolecode_name = await roles_code.findOne({roles_detail_name: object.roles_detail_name});
//     const ex_rolecode_code = await roles_code.findOne({code: object.roles_detail_code});
//     if(!ex_rolecode_code || !ex_rolecode_name) {
//       return reject('Not exist in roles detail list');
//     }

//     // find role you want to push a new role details
//     const curr_role = await roles.findOne({type: object.type});
//     if(!curr_role || curr_role.status == 0) {
//       return reject('Invalid role type or this role was disabled. Try again');
//     };
    
//     const new_role_detail = {
//       status: '1',
//       roles_detail_name: object.roles_detail_name,
//       code: object.roles_detail_code,
//     };
//     // check role detail is existance or not
//     const curr_role_detail = curr_role.roles_detail.find(detail => detail.code === new_role_detail.code || detail.roles_detail_name === new_role_detail.roles_detail_name);
//     if (curr_role_detail) {
//       return reject('This role already has this role detail');
//     }

//     // push a new role detail
//     curr_role.roles_detail.push(new_role_detail);
//     curr_role.updated_at = Date.now();
//     curr_role.save();

//     resolve(curr_role);
//   });
// };

// module.exports = roles_detail_create;