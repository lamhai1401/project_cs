const userServices  = require('../../services/users');
const roleServices  = require('../../services/roles');
const user_model    = require('../../models/users');
const user_role     = require('../../models/user_role');
const string        = require('../../util/string');
const hash          = require('../../util/hash').hash;
const validate      = require('../../util/validate');

//* update user
function update_user(req, res, next) {
  // validate request param
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
}

//* block user
function block_user(req, res, next) {
  // validate request param
  const constraints = {
    email: {
      presence: true,
      email: true,
    }
  };
  
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

//* unblock user
function unblock_user(req, res, next) {
  // validate request param
  const constraints = {
    email: {
      presence: true,
      email: true,
    }
  };  
  //Verify data
  const object = {
    email: req.body.email
  };

  const err = validate(object, constraints);
  if (err) return res.responseError("USER_UNBLOCK_FAILED", err);

  user_model.findOne(object)
  .then(user => {
    if(!user) return res.responseError("USER_UNBLOCK_FAILED", 'Invalid email');
    userServices.update_user(user.email, { status: '1', updated_at: Date.now()}).then(user=> {
      res.responseSuccess({success: true, data: user});
    });
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("USER_UNBLOCK_FAILED", err.message);
    }
    return res.responseError("USER_UNBLOCK_FAILED", err);
  });
}

//* reset user password
function reset_password(req, res, next) {
  // validate request param
  const constraints = {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 6
      }
    },
  };
  // mapping data from client
  const object = {
    email: req.body.email,
    password: req.body.password
  };

  const err = validate(object, constraints);
  if (err) return res.responseError("USER_RESET_PASSWORD_FAILED", err);
  
  userServices.get_user({email: req.user.email})
  .then(user => {
    if(user.role != 'ADMIN') return Promise.reject('You dont have permission to do this');
  })
  .then(() => {
    return userServices.get_user({email: object.email}).then(user => {
      if(user.role == 'ADMIN ') return Promise.reject('You can not reset Admin password');
      return user;
    });
  })
  .then(user => {
    return hash(object.password).then(hash_pass => {
      return userServices.update_user(user.email, {password: hash_pass, updated_at: Date.now()})
    })
  })
  .then(user => {
    res.responseSuccess({success: true, data: user});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("USER_RESET_PASSSWORD_FAILED", err.message);
    }
    return res.responseError("USER_RESET_PASSSWORD_FAILED", err);
  });
}

module.exports = {
  update_user: update_user,
  block_user: block_user,
  unblock_user: unblock_user,
  reset_password: reset_password
};