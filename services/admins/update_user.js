const users       = require('../../models/users');
const roles       = require('../../models/roles');
const user_roles  = require('../../models/user_role');
const string      = require('../../util/string');

// ko được đổi email và role
function update(object) {
  return new Promise( async (resolve, reject) => {

    const user = await users.findOne({email: object.email});
    
    // check valid email
    if(!user) {
      return reject('Invalid email');
    };

    // check disable email
    if(user.status == 0) {
      return reject('This account was disabled');
    }

    // map new user to current user
    user.name        = await string.capitalize(object.name);
    user.updated_at  = Date.now();
    // save
    user.save();

    // find a valid role
    object.type = string.createcode(object.type);
    const role = await roles.findOne({type: object.type});
    if(!role) {
      return reject('Invalid role');
    };

    // find a user role
    const user_role = await user_roles.findOne({id_user: user._id});
    if(!user_role) {
      return reject('This user has not any role');
    };

    // update new role to new user
    user_role.id_role = role._id;
    user_role.save();

    resolve(user);
  });
};

module.exports = update;