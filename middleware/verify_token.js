const jwt = require('../util/jwt');

module.exports = (req, res, next) => {
  // check login
  const url = req.originalUrl;
  const isLogin = url.search("login");
  if(isLogin != -1) return next();
  
  // check token req.body.token || 
  const token = req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  
  if (!token) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", "Need to Login");
  };
  // check expired token 
  return jwt.verifyToken(token)
  .then(info => {
    if(info == 'jwt expired') {
      return res.responseFailAuth("UNAUTHORIZED_ERROR", "Login again");
    };
    req.user = info;
    next();
  })
  .catch(err => {
    if(err.message) {
      return res.responseFailAuth("VERIFY_TOKEN_FAILED", err.message);
    }
    return res.responseFailAuth("VERIFY_TOKEN_FAILED", err);
  });
};