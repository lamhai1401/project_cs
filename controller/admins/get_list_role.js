const roles_mode = require('../../models/roles');

module.exports = (req, res, next) => {
  roles_mode.find()
  .then(list =>  res.responseSuccess({success: true, data: list}))
  .catch(err => {
    if(err.message) {
      return res.responseError("USER_CREATED_FAILED", err.message);
    }
    return res.responseError("USER_CREATED_FAILED", err);
  });
}