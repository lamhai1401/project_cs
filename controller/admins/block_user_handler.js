const userServices = require('../../services/users');
const validate    = require('validate.js');

const constraints = {
  email: {
    presence: true,
    email: true,
  }
};

module.exports = (req, res, next) => {
  //Verify data
  const object = {
    email: req.body.email
  };

  const err = validate(object, constraints);
  if (err) return res.responseError("USER_BLOCK_FAILED", err);
  userServices.get_user(object)
  .then(user => {
    if (user.role == "ADMIN") return Promise.reject('You can not block Admin');
    userServices.update_user(object.email, { status: '0', updated_at: Date.now()}).then(user=> {
      res.responseSuccess({success: true, data: user});
    });
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("USER_BLOCK_FAILED", err.message);
    }
    return res.responseError("USER_BLOCK_FAILED", err);
  });
}