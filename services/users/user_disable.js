const users       = require('../../models/users');
const user_roles  = require('../../models/user_role');
const roles       = require('../../models/roles');

function disable_user(object) {
  return new Promise ( async(resolve, reject) => {

    // find user
    const user = await users.findOne({email: object.email});
    if(!user) {
      return reject('Invalid user email');
    };

    // valid reset password of admin
    const user_role = await user_roles.findOne({id_user: user._id});
    const role      = await roles.findOne({_id: user_role.id_role});
    if(role.type == 'ADMIN') {
      return reject('You can not disabled ADMIN account');
    }

    // settting status of user = 0;
    user.status = 0;
    user.token = "";
    user_role.status = 0;
    user.updated_at = Date.now();
    user.save();
    user_role.save();

    resolve(user);
  });
}

module.exports = disable_user;