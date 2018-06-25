const jwt = require('../util/jwt');

module.exports = (req, res, next) => {
  // check login
  const url = req.originalUrl;
  const isLogin = url.search("login");
  if(isLogin != -1) return next();
  
  // check token
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", "Need to Login");
  };
  // check expired token 
  jwt.verifyToken(token)
  .then(info => {
    if(info == 'jwt expired') {
      return res.responseFailAuth("UNAUTHORIZED_ERROR", "Login again");
    };
    req.user = info;
    next();
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("CHANGE_PASSWORD_FAILED", err.message);
    }
    return res.responseError("CHANGE_PASSWORD_FAILED", err);
  });
};