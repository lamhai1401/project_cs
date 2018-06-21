const userServices = require('../services/users');

module.exports = (req, res, next) => {
  userServices.get_user({email: req.user.email})
  .then(user => {
    if(user.role != 'ADMIN') return res.responseFailAuth("UNAUTHORIZED_ERROR", 'you need to have ADMIN role to do this');
    else return next();
  })
  .catch(err => res.responseFailAuth("UNAUTHORIZED_ERROR", err));
};