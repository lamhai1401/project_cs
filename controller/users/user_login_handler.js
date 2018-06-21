const userServices = require('../../services/users');

module.exports = (req, res, next) => {
  const object = {
    email: req.body.email,
    password: req.body.password,
  };

  userServices.log_in(object)
  .then(user => {
    return res.responseSuccess({success: true, data: user});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("LOGIN_FAILED", err.message);
    }
    return res.responseError("LOGIN_FAILED", err);
  })
};