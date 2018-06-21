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
  const group       = list_param[list_param.length -1];

  if ( path === 'login') return next();

  // get user info and check it was disabled
  const user = await users.findOne({email: req.user.email});
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
  }

  // find the role pers url
  const list_pers = await role_pers.find({group: group, id_role: role._id});
  if(!list_pers) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", 'Invalid role permission of this role/group');
  };

  var per = '';
  if(path.length > 20) {
    per  = list_pers.find(per => per.url === "/"+ group + "/");
  }
  else {
    per  = list_pers.find(per => per.url === "/"+ group + "/" + path);
  };

  // console.log(JSON.stringify(req))
  if (!per || per.status == 0) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", 'You dont have permission (or was disabled) to do this');
  }

  const isRightPer = originalUrl.search(per.url);
  if(isRightPer ==  -1 ) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", 'You dont have permission to do this');
  }
  
  // pass if user has this role url
  req.body.manager = info;
  next();
};
module.exports = dispatcher;