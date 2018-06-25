const userServices = require('../services/users');

module.exports = (req, res, next) => {
  userServices.get_user({email: req.user.email})
  .then(user => {
    if(user.role != 'ADMIN') return res.responseFailAuth("UNAUTHORIZED_ERROR", 'This service only for Admin role');
    else return next();
  })
  .catch(err => res.responseFailAuth("UNAUTHORIZED_ERROR", err));
};