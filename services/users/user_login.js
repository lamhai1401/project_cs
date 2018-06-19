const users   = require('../../models/users')
const logins  = require('../../models/logins');
const compare = require('../../util/hash').compare;
const jwt     = require('../../util/jwt');

function login(object) {
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
    };
    
    // create login
    const login = await logins.create({
      user_id: user._id,
      email: user.email,
      display_name: user.display_name,
    });
    // update token
    user.token = await jwt.createToken(object);
    user.last_login = login.login_at;
    user.updated_at = Date.now();
    user.save();
    resolve(user);
  });
}

module.exports = login;