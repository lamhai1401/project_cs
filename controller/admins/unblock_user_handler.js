const userServices = require('../../services/users');

module.exports = (req, res, next) => {
  //Verify data
  const object = {
    email: req.body.email
  }
  userServices.get_user(object)
  .then(user => {
    userServices.update_user(object.email, { status: '1', updated_at: Date.now()}).then(user=> {
      res.responseSuccess({success: true, data: user});
    });
  })
  .catch(err => {
    return res.responseError("ENABLE_FAILED", err);
  });
}