const users = require('../../models/users');
const user_role = require('../../models/user_role');
const roleServices = require('../roles');

//* get user
function get_user(object) {
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
      });
    });
  });
}

//* get list users
function list_users() {
  return new Promise((resolve, reject) => {
    return users.aggregate([
      {
        $lookup: {
          from: "user_roles",
          localField: "_id",
          foreignField: "id_user",
          as: "user_role"
        }
      },
      {
        $unwind: {
          path: "$user_role",
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $lookup: {
          from: "roles",
          localField: "user_role.id_role",
          foreignField: "_id",
          as: "role"
        }
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: false
        }
      }
    ], (err, list) => {
      if(!list[0]) return reject('Cannot list user');
      return resolve(list);
    }); 
  });
} 

module.exports = {
  get_user: get_user,
  list_users: list_users
};