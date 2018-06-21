const userServices = require('../services/users');

const dispatcher = async (req, res, next) => {
  // get request url
  const originalUrl = req.originalUrl;
  const isAdmin = originalUrl.search("admin");
  if(isAdmin != -1) {
    userServices.get_user({email: req.user.email})
    .then(user => {
      if(user.role != 'ADMIN') return res.responseFailAuth("UNAUTHORIZED_ERROR", 'you need to have ADMIN role to do this');
      else return next();
    })
    .catch(err => res.responseFailAuth("UNAUTHORIZED_ERROR", err));
  } 
  else {
    return next();
  }
};
module.exports = dispatcher;