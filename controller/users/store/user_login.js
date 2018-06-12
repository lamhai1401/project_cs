const users   = require('../../../models').users;
const logins   = require('../../../models').logins;
const compare = require('../../../methods').compare;
const jwt     = require('../../../methods').jwt;

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test')
//     .then(connection => {
//         console.log('     [Mongodb] Connected to MongoDB');
//         console.log('     ======================== \n');
//     })
//     .catch(error => {
//         console.log('     [Mongodb] ' + error.message);
//     });
// mongoose.Promise = global.Promise;

async function login(object) {
  return new Promise(async(resolve, reject) => {
    const user = await users.findOne({email: object.email});
    if(!user) {
      return reject('Invalid email');
    };
    const isPasswordRight = await compare(object.password, user.password);
    if (!isPasswordRight) {
      return reject('Wrong password');
    };
    if(user.status == 0) {
      return reject('Your account was disabled');
    }

    // create login
    logins.create({
      user_id: user._id
    });

    // update token
    user.token = await jwt.createToken(object);
    user.updated_at = Date.now();
    user.save();

    resolve(user);
  });
}

module.exports = login;

// login({email: 'lamthanhhai141@gmail.com', password: '123456'})
// .then(data => console.log(data))
// .catch(err => console.log(err));