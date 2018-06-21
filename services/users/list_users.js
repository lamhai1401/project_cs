const users = require('../../models/users');

// module.exports = (filter = {}) => {
//   return new Promise((resolve, reject) => {
//     const user = users.find({});
//     user.sort({email: -1});
//     user.select('name email status last_login created_at');
//     user.exec((err, users) => {
//       if (err) reject(err);
//       resolve(users);
//     });
//   })
// };

function list_users() {
  return new Promise( async(resolve, reject) => {
    const list = await users.aggregate([
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
      },
    ]);
    
    // check empty list
    if(!list[0]) {
      return reject('Can not list user');
    };

    resolve(list);
  });
};

module.exports = list_users;