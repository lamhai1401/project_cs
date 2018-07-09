const users         = require('../models/users');
const user_role     = require('../models/user_role');
const permissions   = require('../models/permissions');
const roleServices  = require('../services/roles');
const searching     = require('../util/setup_searching');

module.exports = (req, res, next) => {
  
  // get request url
  const originalUrl = req.originalUrl;
  const list_param  = originalUrl.split(/\W+/g);
  const path        = list_param.pop();
  const method      = req.method;

  // pass if user call login method
  if( path === 'login') return next();
  
  users.findOne({email: req.user.email}).then(user => {
    if(!user) return Promise.reject('Invalid email');
    if(user.status == 0) return Promise.reject('This account was disabled');
    return user;
  }).then(user => {
    return user_role.findOne({id_user: user._id}).then( user_role => {
      if(!user_role) return Promise.reject('You dont have user role');
      if(user_role.status == 0) return Promise.reject('Your role was diabled');
      return roleServices.get_role_from_id({id: user_role.id_role}).then(role => {
        if(role.status == 0) return Promise.reject('This role was disabled');
        if(!role) return Promise.reject('Invalid role');
        return role;
      })
    })
  }).then(role => {
    if(role.type == 'ADMIN') {
      return Promise.reject('admin');
    }
    return permissions.find({role: role.type, method: method});
  }).then(list_pers => {
    if(list_pers.length == 0) return Promise.reject('Your list permissions is empty');
    var isPer = false;
    return searching([{url: originalUrl}]).then(search => {
      list_pers.forEach(per => {
        if(search.search(per.url).length >= 1) {
          isPer = true;
          return;
        }
      });
      return isPer;
    });
  }).then(isPer => {
    if (isPer) return next();
    return Promise.reject('You dont have permissions to do this');
  }).catch(err => {
    if(err == 'admin') return next();
    if(err.message) {
      return res.responseFailAuth("UNAUTHORIZED_ERROR", err.message);
    }
    return res.responseFailAuth("UNAUTHORIZED_ERROR", err);
  });
};

