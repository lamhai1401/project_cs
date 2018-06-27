const userServices = require('../../services/users');
const validate    = require('validate.js');
const string      = require('../../util/string');

const constraints = {
  id: {
    presence: true,
  },
  role: {
    presence: true,
  },
};

module.exports = (req, res, next) => {
  // mapping data from request
  const object = {
    id: req.body.id,
    role: string.createcode(req.body.role)
  };
  // validate data
  const err = validate(object, constraints);
  if (err) return res.responseError("REMOVE_PERMISSIONS_FAILED", err);

  if(object.role == 'ADMIN') return res.responseError("REMOVE_PERMISSIONS_FAILED", 'Can not remove admin permissions');

  userServices.remove_pers(object)
  .then(per => {
    res.responseSuccess({success: true, data: per});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("REMOVE_PERMISSIONS_FAILED", err.message);
    }
    return res.responseError("REMOVE_PERMISSIONS_FAILED", err);
  });
};