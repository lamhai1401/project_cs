const users       = require('../../models/users');
const mongoose    = require('mongoose');

function find(object) {
  return new Promise( async(resolve, reject) => {
    const user = await users.aggregate([
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
          from: "role_pers",
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
      },
      {
        $lookup: {
          from: "role_pers",
          localField: "user_role.id_role",
          foreignField: "id_role", 
          as: "action"
        }
      },
      {
        $project: {
          _id: object.id
        }
      }
    ]);
    console.log(user);
    // check empty list
    if(!user) {
      return reject('Can not list user');
    };

    resolve(user);
  });
};

module.exports = find;