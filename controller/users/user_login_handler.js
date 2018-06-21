const userServices = require('../../services/users');
const validate    = require('validate.js');
const constraints = {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
  }
};
module.exports = (req, res, next) => {
  const object = {
    email: req.body.email,
    password: req.body.password,
  };

  const err = validate(object, constraints);
  if (err) return res.responseError("USER_LOGIN_FAILED", err);
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