const users       = require('../../models/users');
const string      = require('../../util/string');
const roles       = require('../../models/roles');
const hash        = require('../../util/hash').hash;
const user_roles  = require('../../models/user_role');

function create(object) {
  return new Promise( async(resolve, reject) => {

    // format
    object.password     = await hash(object.password);
    object.name         = string.capitalize(object.name);
    object.role_type    = string.createcode(object.role_type);

    // check role_type is exist or not and not admin type
    const role = await roles.findOne({type: object.role_type});
    if(!role || role.status == 0) {
      return reject('Invalid/Disable role type');
    }
    if(role.type == 'ADMIN') {
      return reject('You can not create new User with ADMIN type');
    }

    // check existance user
    const ex_user = await users.findOne({email: object.email});
    if(ex_user) return reject('Email is already existance. Choose another email');

    const new_user        = await users.create(object);
    await user_roles.create({
      id_role: role._id,
      id_user: new_user._id
    });

    resolve({
      email: new_user.email,
      name: new_user.name,
      role: role.name
    });
  })
};

module.exports = create;