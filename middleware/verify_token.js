const jwt = require('../util/jwt');

module.exports = (req, res, next) => {
  // check login
  const url = req.originalUrl;
  const isLogin = url.search("login");
  if(isLogin != -1) return next();
  
  // check token
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
  };
  // check expired token 
  jwt.verifyToken(token)
  .then(info => {
    if(info == 'jwt expired') {
      return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
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