const roles       = require('../../models/roles');
const check_role  = require('./check_role');
const string      = require('../../util/string');
const roles_find_code = require('./role_code').role_find;

// truyền vào cái type là đc rồi
async function find(object, manager_role_id, manager_role_detail_code) {
  return new Promise( async(resolve, reject) => {
    // check role
    const isRightRole = await check_role(manager_role_id, manager_role_detail_code, roles_find_code);
    if( isRightRole != true ) {
      return reject(isRightRole);
    };

    // format object params, because each type is unique
    object.type = string.createcode(object.type);


    // valid role 
    const curr_role = await roles.findOne({type: object.type});
    if(!curr_role) {
      return reject('Invalid role type. Try again');
    };

    resolve(curr_role);
  });
};

module.exports = find;

// find({type: 'readonly'}, '5b1f83cd7fc4e2101c851040', 'ROLE_FIND')
// .then(data => console.log(data))
// .catch(err => console.log(err));