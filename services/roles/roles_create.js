// const roles               = require('../../models/roles');
// const string              = require('../../util/string');
// const check_role          = require('./check_role');
// const jwt                 = require('../../util/jwt');

// function create(object, token, manager_role_detail_code) {
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
//     }

//     object.role_name = string.capitalize(object.role_name);
//     object.type      = string.createcode(object.type);
//     const ex_role_name = await roles.findOne({role_name: object.role_name});
//     const ex_role_type = await roles.findOne({type: object.type});

//     if(ex_role_name || ex_role_type) {
//       return reject('Role NAME or TYPE my be already existance. Check it again');
//     };

//     const newRole = await roles.create(object);
//     resolve (newRole);
//   })
// };

// module.exports = create;