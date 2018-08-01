const userServices= require('../../services/users');
const validate    = require('../../util/validate');
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
  if (err) return res.responseError("ADD_PERMISSIONS_FAILED", err);

  userServices.add_pers(object)
  .then(per => {
    res.responseSuccess({success: true, data: per});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("ADD_PERMISSIONS_FAILED", err.message);
    }
    return res.responseError("ADD_PERMISSIONS_FAILED", err);
  });
};