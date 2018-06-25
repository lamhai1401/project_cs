const hash          = require('../../util/hash').hash;
const compare       = require('../../util/hash').compare;
const userServices  = require('../../services/users');
const jwt           = require('../../util/jwt');

module.exports = (req, res, next) => {
  const object = {
    curr_password: req.body.curr_password,
    new_password: req.body.new_password
  };
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  const email = req.user.email;

  userServices.get_user({email: email})
  .then(user => {
    if(token != user.token) return Promise.reject('login agin');
    return compare(object.curr_password, user.password).then(isPassword => {
      if(!isPassword) return Promise.reject('Wrong password');
      return hash(object.new_password).then(hash_pass => hash_pass);
    })
  })
  .then(hash_pass => {
    jwt.createToken({email: email, password: object.new_password}).then(token => {
      userServices.update_user(email, {password: hash_pass, updated_at: Date.now(), token: token}).then(user => {
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
};