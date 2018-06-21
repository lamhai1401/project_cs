const userServices = require('../../services/users');

module.exports = (req, res, next) => {
  userServices.list_users()
  .then(list => {
    res.responseSuccess({success: true, data: list});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("LIST_USER_FAILED", err.message);
    }
    return res.responseError("LIST_USER_FAILED", err);
  });
};