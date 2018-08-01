const validate    = require('../../util/validate');
const create_user = require('../../services/users').create_user;
const hash        = require('../../util/hash').hash;

function new_user (req, res, next) {

  const constraints = {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
    },
    role_type: {
      presence: true,
      format: /(ADMIN|CS_AGENT|READ)/,
    }
  };
  
  // mapping data from request
  const object = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role_type: req.body.role
  };

  const err = validate(object, constraints);
  if (err) return res.responseError("USER_CREATED_FAILED", err);

  // hash password
  hash(object.password)
  .then(hash_pass => {
    object.password = hash_pass;
    return create_user(object);
  })
  .then(user => res.responseSuccess({success: true, data: user}))
  .catch(err => {
    if(err.message) {
      return res.responseError("USER_CREATED_FAILED", err.message);
    }
    return res.responseError("USER_CREATED_FAILED", err);
  });
}

module.exports = {
  new_user: new_user
};