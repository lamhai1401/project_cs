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
    logins.create({
      user_id: user._id,
      role_type: user.role_type,
      name: user.info.name,
      display_name: user.display_name
    });
    console.log(object);
    // update token
    user.token = await jwt.createToken(object);
    user.updated_at = Date.now();
    user.save();

    resolve(user);
  });
}

module.exports = login;