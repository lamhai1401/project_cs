const users       = require('../../models/users');
const roles       = require('../../models/roles');
const user_roles  = require('../../models/user_role');
const hash        = require('../../util/hash').hash;
const jwt         = require('../../util/jwt');

function reset_password(object) {
  return new Promise( async(resolve, reject) => {

    // find user
    const user = await users.findOne({email: object.email});
    if(!user) {
      return reject('Invalid user email');
    };

    // invalid reset password of admin
    const user_role = await user_roles.findOne({id_user: user._id});
    const role      = await roles.findOne({_id: user_role.id_role});

    if(role.type == 'ADMIN') {
      return reject('You can not reset ADMIN password');
    }

    // hash new password
    const hashPassword  = await hash(object.new_password);
    user.password       = hashPassword;
    user.token          = await jwt.createToken({email: object.email, password: object.new_password});
    user.updated_at     = Date.now();
    user.save();

    resolve(user);
  });
};

module.exports = reset_password;