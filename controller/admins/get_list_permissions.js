const permissions = require('../../models/permissions');

module.exports = (req, res, next) => {
  permissions.find()
  .then(list =>  res.responseSuccess({success: true, data: list}))
  .catch(err => {
    if(err.message) {
      return res.responseError("PERMISSIONS_LIST_FAILED", err.message);
    }
    return res.responseError("PERMISSIONS_LIST_FAILED", err);
  });
}