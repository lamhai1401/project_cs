const jwt   = require('../util/jwt');
const users = require('../models/users');
const roles = require('../models/roles');

const dispatcher = async (req, res, next) => {

  if (req.route.path == '/login') next();
  // check token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
  };
  
  // get manager role id
  token = await jwt.verifyToken(token);
  if(token == 'jwt expired') {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
  };

  // get request url
  const path = req.originalUrl;

  // get user info
  const user = await users.findOne({email: info.email});
  
  // get use role
  const role = await roles.findOne({type: user.role_type});
  if(!role || role.status == 0) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", 'This role is not exist or be disable in your account');
  };

  // get feature from path (roles/users) /api/roles/create
  const feature = path.split("/")[2];

  // find feature role detail from role
  const list_role_url = role.roles_detail[feature];

  // comepare with this regex 
  const isRightRole = list_role_url.find(url => url === path);

  // pass if user has this role url
  if(isRightRole) next();

  return res.responseFailAuth("UNAUTHORIZED_ERROR", 'This role is not exist or be disable in your account');
};
module.exports = dispatcher;

const url = {
  user: [

  ],
  role: [

  ],
};

// const regex = /^\/api\/user\/[\d].*/gm;
// const str = `/api/user/create
// /api/user/updatea
// /api/user/55555141`;
// let m;

// while ((m = regex.exec(str)) !== null) {
//     // This is necessary to avoid infinite loops with zero-width matches
//     if (m.index === regex.lastIndex) {
//         regex.lastIndex++;
//     }
    
//     // The result can be accessed through the `m`-variable.
//     m.forEach((match, groupIndex) => {
//         console.log(`Found match, group ${groupIndex}: ${match}`);
//     });
// } 

// const host = require('../config/config').host;
//const index_url     = require('config').HOST.INDEX;
// const index_url     = '/api/v1'
// const user_mid_url = '/users';
// const role_mid_url = '/roles';

// const admin_list_url = [
//   // user router
//   index_url+user_mid_url+'/create',
//   index_url+user_mid_url+'/find',
//   index_url+user_mid_url+'/list',
//   index_url+user_mid_url+'/update',
//   index_url+user_mid_url+'/password/change',
//   index_url+user_mid_url+'/password/reset',
//   index_url+user_mid_url+'/disable',
//   index_url+user_mid_url+'/enable',
//   index_url+user_mid_url+'/role/change',

//   // role router
//   index_url+role_mid_url+'/create',
//   index_url+role_mid_url+'/detail/create',
//   index_url+role_mid_url+'/find',
//   index_url+role_mid_url+'/rolescode/create',  
// ];
// const cs_agent_list_url = [

// ];
// const url= {
//   Q: admin_list_url,
// };
// console.log(url['Q']);

var str = `/api/roles/create`;

a = str.split("/")[2];
console.log(str);
console.log(a);