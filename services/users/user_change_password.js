const users = require('../../models/users');
const hash  = require('../../util/hash').hash;
const jwt   = require('../../util/jwt');

async function change_password(object) {
  return await new Promise(async(resolve, reject) => {
    const user = await users.create({email: object.email});
    if(!user) {
      return reject('Invalid email');
    };

    // hash password and create new token with this
    const hashPassword = await hash(object.password);
    const token        = await jwt.createToken({email: object.email, password: hashPassword});
    user.password = hashPassword;
    user.token    = token;
    user.save();
    resolve(user);
  });
}

module.exports = change_password;