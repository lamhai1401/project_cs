const userServices  = require('../../services/users');
const roleServices  = require('../../services/roles');
const user_role     = require('../../models/user_role');
const string      = require('../../util/string');
const validate    = require('validate.js');

const constraints = {
  email: {
    presence: true,
    email: true,
  },
  name: {
    presence: true,
  },
  role: {
    presence: true,
    format: /(ADMIN|CS_AGENT|READ)/,
  }
};

module.exports = (req, res, next) => {
  // mapping data
  const object = {
    name: string.capitalize(req.body.name),
    role: req.body.role,
    email: req.body.email
  };

  let err = validate(object, constraints);
  if (err) return res.responseError("USER_UPDATED_FAILED", err)
  else {
    userServices.get_user({email: object.email})
    .then(user => {
      if (user.role == 'ADMIN') return Promise.reject('You can not change ADMIN role');
      roleServices.get_role_from_type({type: object.role}).then(role => {
        if(role.type == 'ADMIN') return Promise.reject('Can not change to ADMIN role');
        userServices.update_user(object.email, {name: object.name, updated_at: Date.now()}).then(user => {
          user_role.update({id_user: user._id}, {id_role: role._id, updated_at: Date.now()});
          res.responseSuccess({success: true, data: user});
        });
      });
    })
    .catch(err => res.responseError("USER_RESET_PASSWORD_FAILED", err));
  };
};