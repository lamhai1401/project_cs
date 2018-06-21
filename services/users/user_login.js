const LoginsModel      = require('../../models/logins');
const compare     = require('../../util/hash').compare;
const jwt         = require('../../util/jwt');
const user_model  = require('../../models/users');

module.exports = (object) => {
  return new Promise((resolve, reject) => {
    const time = Date.now();
    //Find User
    user_model.findOne({email: object.email}).then(user => {
      if(!user) return reject('User don\'t exist');
      if(user.status == 0) return reject('Your account was disabled');
      //Verify password
      return compare(object.password, user.password).then(res=>{
        if(!res) return reject('Wrong password');
        return user;
      });
    }).then(user => {
      // gen token
      return jwt.createToken(object).then(token =>{
        return {
          token: token,
          user: user,
        }
      });
    }).then(({token, user}) => {
      let history_login = new LoginsModel({
        user_id: user._id,
        email: user.email,
        login_at: time,
      });
      history_login.save();
      //update token for document user
      user.token = token;
      user.last_login = time;
      user.updated_at = time;

      resolve(user);
      user.save(); 
    }).catch(err => reject(err));
  });
};

