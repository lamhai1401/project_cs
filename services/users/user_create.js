const users       = require('../../models/users');
const string      = require('../../util/string');
const roles       = require('../../models/roles');
const hash        = require('../../util/hash').hash;
const check_role  = require('../roles/check_role');
const jwt         = require('../../util/jwt');

function create(object, token, manager_role_detail_code) {
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
    // format
    object.info.name  = string.capitalize(object.info.name);
    object.role_type  = string.createcode(object.role_type);
    object.password   = await hash(object.password);
    
    // check role_type is exist or not
    const role = await roles.findOne({type: role_type});
    if(!role) {
      return reject('Invalid role type');
    }

    // check existance user
    const ex_user = await users.findOne({email: object.email});
    if(ex_user) return reject('Email is already existance. Choose another email');

    const new_user = await users.create(object);
    resolve (new_user);
  })
};

module.exports = create;

// const object = {
//   email: 'lamthanhhai141@gmail.com',
//   password: '123456',
//   //srole: 'admin',
//   display_name: 'Chăm sóc khách hàng',
//   info: {
//     name: 'Thanh Hải',
//     passport: '334808394',
//     address: '56/3 Văn chung- f.13- q.Tân Bình'
//   },
// };

// create(object)
// .then(data => console.log(data))
// .catch(err => console.log(err));