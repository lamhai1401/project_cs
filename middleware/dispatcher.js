const jwt         = require('../util/jwt');
const users       = require('../models/users');
const roles       = require('../models/roles');
const user_roles  = require('../models/user_role');
const role_pers   = require('../models/role_pers');

const dispatcher = async (req, res, next) => {
  
  // get request url
  const originalUrl = req.originalUrl;
  const list_param  = originalUrl.split(/\W+/g);
  const path          = list_param.pop();
  
  if ( path === 'login') return next();
  next();
};
module.exports = dispatcher;