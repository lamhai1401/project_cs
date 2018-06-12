const roles         = require('../../../models').roles;
const string        = require('../../../methods').string;
const role_ceate_code    = require('../role_code').role_create;
const check_role    = require('../../check_role');

async function create(object, user_role_id, user_role_detail_code) {
  return new Promise( async(resolve, reject) => {
    // check role
    const isRightRole = await check_role(user_role_id, user_role_detail_code, role_ceate_code);
    if( isRightRole != true ) {
      return reject(isRightRole);
    }

    object.role_name = string.createcode(object.role_name);
    object.roles_detail.roles_detail_name = string.capitalize(object.roles_detail.roles_detail_name);
    object.roles_detail.code = string.createcode(object.roles_detail.code);
    const ex_role = await roles.findOne({role_name: object.role_name});

    if(ex_role) {
      return reject('Role name is already existance. Check it again');
    };

    const newRole = await roles.create(object);
    resolve (newRole);
  })
};

module.exports = create;