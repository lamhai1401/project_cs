const roles_mode  = require('../../models/roles');
const permissions = require('../../models/permissions');
const list_users  = require('../../services/users').list_users;

//* Get list role of cs database server
function list_role (req, res, next) {
  roles_mode.find()
  .then(list =>  res.responseSuccess({success: true, data: list}))
  .catch(err => {
    if(err.message) {
      return res.responseError("USER_LIST_FAILED", err.message);
    }
    return res.responseError("USER_LIST_FAILED", err);
  });
}

//* Get list permissions of cs database server
function list_pers(req, res, next) {
  permissions.find()
  .then(list =>  res.responseSuccess({success: true, data: list}))
  .catch(err => {
    if(err.message) {
      return res.responseError("PERMISSIONS_LIST_FAILED", err.message);
    }
    return res.responseError("PERMISSIONS_LIST_FAILED", err);
  });
}

//* Get list cs portal
function list_user (req, res, next) {
  list_users()
  .then(list => {
    res.responseSuccess({success: true, data: list});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("LIST_USER_FAILED", err.message);
    }
    return res.responseError("LIST_USER_FAILED", err);
  });
}

module.exports = {
  list_role: list_role,
  list_pers: list_pers,
  list_users: list_user
};