const users = require('../../models/users');

function list_users() {
  return new Promise( async(resolve, reject) => {
    const list = await users.aggregate([
      {
        $lookup: {
          from: "user_roles",
          localField: "_id",
          foreignField: "id_user",
          as: "userRole"
        }
      }, {
        $unwind: {
          path: "$userRole",
          preserveNullAndEmptyArrays: false
        }
      }, {
        $lookup: {
          from: "roles",
          localField: "userRole.id_role",
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
    ]);
    
    // check empty list
    if(!list) {
      return reject('Can not list user');
    }
    resolve(list);
  });
};

module.exports = list_users;