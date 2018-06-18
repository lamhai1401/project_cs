// const roles       = require('../../models/roles');
// const check_role  = require('./check_role');
// const string      = require('../../util/string');
// const jwt         = require('../../util/jwt');

// // truyền vào cái type là đc rồi
// function find(object, token, manager_role_detail_code) {
//   return new Promise( async(resolve, reject) => {

//     // format object params, because each type is unique
//     object.type = string.createcode(object.type);
//     // can not find admin role
//     if(object.type == 'ADMIN') {
//       return reject('You can not find admin role');
//     }

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

//     // valid role 
//     const curr_role = await roles.findOne({type: object.type});
//     if(!curr_role) {
//       return reject('Invalid role type. Try again');
//     };

//     resolve(curr_role);
//   });
// };

// module.exports = find;

// // find({type: 'readonly'}, '5b1f83cd7fc4e2101c851040', 'ROLE_FIND')
// // .then(data => console.log(data))
// // .catch(err => console.log(err));