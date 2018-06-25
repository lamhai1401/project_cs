const users_model     = require('../../models/users');
const user_model      = require('../../models/users');
const role_services   = require('../../services/roles');
const user_role_model = require('../../models/user_role');

module.exports = (object) => {  
  return user_model.findOne({email: object.email})
    .then(user => {
      if(user) return Promise.reject('Existing Email');
      // check role_type is exist or not and not admin type
      return role_services.get_role_from_type({type: object.role_type});
    }).then(role => {
      if(!role || role.status == 0) {
        return Promise.reject('This current role was disable or invalid');
      }
      if(role.type == 'ADMIN') {
        return Promise.reject('You can not create new user with Admin type');
      };
      return role;
    }).then(role => {
      return users_model.create(object).then((user) => {
          return  {role: role, user: user};
        });
    }).then(object => {
      return user_role_model.create({id_role: object.role._id, id_user: object.user._id}).then((user)=>{
        return object;
      });
    });
};