const jwt         = require('../util/jwt');
const users       = require('../models/users');
const roles       = require('../models/roles');
const user_roles  = require('../models/user_role');
const string      = require('../util/string');

const dispatcher = async (req, res, next) => {
  // get request url
  const originalUrl = req.originalUrl;
  const list_param  = originalUrl.split(/\W+/g);
  const group       = list_param[3];

  // check token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
  };
  
  // check expired token 
  const info = await jwt.verifyToken(token);
  if(info == 'jwt expired') {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
  };

  // get user info and check it was disabled
  const user = await users.findOne({email: info.email});
  if(!user || user.status == 0) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", 'Invalid/Disabled user');
  }

  // get user roles
  const user_role = await user_roles.findOne({id_user: user._id});
  if(!user_role || user_role.status == 0) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", 'This user has not role to do this');
  };
  const role_id = user_role.id_role;

  // check status of role
  const role = await roles.findOne({_id: role_id});
  if(!role || role.status == 0) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", 'Your role was disable or not exist');
  };

  if(group == 'admin') {
    return next();
  };
  return res.responseFailAuth("UNAUTHORIZED_ERROR", 'Your role was disable or not exist');
};
module.exports = dispatcher;