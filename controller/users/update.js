const hash          = require('../../util/hash').hash;
const compare       = require('../../util/hash').compare;
const user_model    = require('../../models/users');
const userServices  = require('../../services/users');
const validate      = require('../../util/validate');
const jwt           = require('../../util/jwt');

//* Account owner update new password
function change_password(req, res, next) {
  // mapping request param
  const object = {
    curr_password: req.body.curr_password,
    new_password: req.body.new_password
  };
  // validate request param
  const constraints = {
    curr_password: {
      presence: true,
    },
    new_password: {
      presence: true,
      length: {
        minimum: 6
      }
    }
  };
  const err = validate(object, constraints);
  if(err) return res.responseError("CHANGE_PASSWORD_FAILED", err);

  // get cs account info
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  const email = req.user.email;

  // request
  user_model.findOne({email: email})
  .then(user => {
    if(token != user.token) return Promise.reject('login again');
    // compare password and curr password
    return compare(object.curr_password, user.password).then(isPassword => {
      if(!isPassword) return Promise.reject('Wrong current password');
      return hash(object.new_password).then(hash_pass => hash_pass);
    });
  })
  .then(hash_pass => {
    return jwt.createToken({email: email, password: object.new_password}).then(token => {
      return userServices.update_user(email, {password: hash_pass, updated_at: Date.now(), token: token}).then(user => {
        res.responseSuccess({success: true, data: user});
      });
    });
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("CHANGE_PASSWORD_FAILED", err.message);
    }
    return res.responseError("CHANGE_PASSWORD_FAILED", err);
  });
  
}

module.exports = {
  change_password: change_password
};