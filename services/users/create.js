const user_model      = require('../../models/users');
const role_services   = require('../../services/roles');
const user_role_model = require('../../models/user_role');

//* Create new user
function new_user(object) {
  return new Promise((resolve, reject) => {
    user_model.findOne({email: object.email})
    .then(user => {
      if(user) return reject('Existing email');
      // check role_type is exist or not and not admin type
      return role_services.get_role_from_type({type: object.role_type});
    })
    .then(role => {
      if(!role || role.status == '0') return reject('This current role was disable or invalid');
      if(role.type == 'ADMIN') return reject('You can not create new user with Admin type');
      return user_model.create(object)
      .then(user => {
        user_role_model.create({id_role: role._id, id_user: user._id});
        return resolve({user, role});
      })
      .catch(err => reject(err));
    })
    .catch(err => reject(err));
  });
}

module.exports = {
  new_user: new_user
};