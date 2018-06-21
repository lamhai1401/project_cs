const userServices = require('../../services/users');
const hash         = require('../../util/hash').hash;

module.exports = (req, res, next) => {
  // mapping data from client
  const object = {
    email: req.body.email,
    password: req.body.password
  };

  userServices.get_user({email: req.user.email})
  .then(user => {
    if(user.role != 'ADMIN') return Promise.reject('You dont have permission to do it');
  })
  .then(() => {
    return userServices.get_user({email: object.email}).then(user => {
      if(user.role == 'ADMIN ') return Promise.reject('You can not reset ADMIN password');
      return user;
    });
  })
  .then(user => {
    return hash(object.password).then(hash_pass => {
      return userServices.update_user({email: user.email}, {password: hash_pass, updated_at: Date.now()})
    })
  })
  .then(user => {
    res.responseSuccess({success: true, data: user});
  })
  .catch(err => res.responseError("USER_RESET_PASSWORD_FAILED", err));
};