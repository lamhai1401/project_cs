const roles               = require('../../models/roles');
const roles_code          = require('../../models/roles_code');
const string              = require('../../util/string');
const check_role          = require('./check_role');
const jwt                 = require('../../util/jwt');

function roles_code_create(object, token, manager_role_detail_code) {
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

    object.roles_detail_name = string.capitalize(object.roles_detail_name);
    object.code              = string.createcode(object.code);
    const ex_rolecode_name   = await roles_code.findOne({roles_detail_name: object.roles_detail_name});
    const ex_rolecode_code   = await roles_code.findOne({code: object.code}) 

    if(ex_rolecode_name || ex_rolecode_code) {
      return reject('Role code NAME or TYPE my be already existance. Check it again');
    };

    const new_rolecode = await roles_code.create(object);

    // automatic push a new role detail to admin role
    const admin_role = await roles.findOne({type: 'ADMIN'});
    admin_role.roles_detail.push(new_rolecode);
    admin_role.updated_at = Date.now();
    admin_role.save();

    resolve (new_rolecode);
  })
};

module.exports = roles_code_create;