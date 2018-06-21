const users = require('../../models/users');
const user_role = require('../../models/user_role');
const roleServices = require('../roles');

module.exports = (object) => {
  return users.findOne({email: object.email})
  .then(user => {
    if(!user) return Promise.reject('Invalid email');
    if(user.status == 0) return Promise.reject('This account was disabled');
    return user;
  })
  .then(user => {
    return user_role.findOne({id_user: user._id}).then( user_role => {
      if(!user_role) return Promise.reject('You dont have user role');
      if(user_role.status == 0) return Promise.reject('Your role was diabled');
      return roleServices.get_role_from_id({id: user_role.id_role}).then(role => {
        if(role.status == 0) return Promise.reject('This role was disabled');
        if(!role) return Promise.reject('Invalid role');
        user.role = role.type;
        return user;
      })
    })
  });
};
