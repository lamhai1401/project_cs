const users       = require('../../models/users');
const string      = require('../../util/string');
const hash        = require('../../util/hash').hash;
const check_role  = require('../roles/check_role');

async function create(object, manager_role_id, manager_role_detail_code) {
  return new Promise( async(resolve, reject) => {
    // check role
    const isRightRole = await check_role(manager_role_id, manager_role_detail_code);
    if( isRightRole != true ) {
      return reject(isRightRole);
    }
    // format
    object.info.name = string.capitalize(object.info.name);
    object.role = string.createcode(object.role);
    object.password = await hash(object.password);
    
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