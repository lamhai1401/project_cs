const users = require('../../../models').users;
const string  = require('../../../methods').string;
const hash    = require('../../../methods').hash;
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test')
//     .then(connection => {
//         console.log('     [Mongodb] Connected to MongoDB');
//         console.log('     ======================== \n');
//     })
//     .catch(error => {
//         console.log('     [Mongodb] ' + error.message);
//     });
// mongoose.Promise = global.Promise;

async function create(object) {
  return new Promise( async(resolve, reject) => {
    object.info.name = string.capitalize(object.info.name);
    object.role = string.createcode(object.role);
    object.password = await hash(object.password);
    const ex_user = await users.findOne({email: object.email});
    if(ex_user) return reject('Email is already existance. Choose another email');

    const new_user = await users.create(object);
    resolve (new_user);
  })
};

module.exports = create;

// const object = {
//   email: 'lamthanhhai141@gmail.com',
//   password: '123456',
//   //srole: 'admin',
//   display_name: 'Chăm sóc khách hàng',
//   info: {
//     name: 'Thanh Hải',
//     passport: '334808394',
//     address: '56/3 Văn chung- f.13- q.Tân Bình'
//   },
// };

// create(object)
// .then(data => console.log(data))
// .catch(err => console.log(err));