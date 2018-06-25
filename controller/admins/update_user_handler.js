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
    format: /(ADMIN|CS_AGENT|READONLY)/,
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
  if (err) return res.responseError("USER_UPDATED_FAILED", err);

  userServices.get_user({email: object.email})
  .then(user => {
    if(user.role == 'ADMIN') return Promise.reject(`You can not update Admin`);
    return roleServices.get_role_from_type({type: object.role}).then(role => {
      const info = {user, role};
      return info;
    });
  })
  .then(info => {
    if(info.role.type == 'ADMIN') return Promise.reject(`You can not change from ${info.user.role} to Admin role`);
    return userServices.update_user(object.email, {name: object.name, updated_at: Date.now()}).then(user => {
      return user_role.findOneAndUpdate({id_user: user._id}, {id_role: info.role._id, updated_at: Date.now()}, {new: true}).then(user_role => {
        return res.responseSuccess({success: true, data: info});
      })
    })
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("USER_UPDATE_FAILED", err.message);
    }
    return res.responseError("USER_UPDATE_FAILED", err);
  });
};