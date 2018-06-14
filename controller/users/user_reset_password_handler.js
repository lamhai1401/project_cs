const reset_password = require('../../services/users/user_reset_password');

const resetPasswordHandler = async (req, res, next) => {
  try {

    // check token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
    };

    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    const object = {
      email: req.body.email,
      new_password: req.body.new_password,
    };
    const manager_role_detail_code  = req.body.manager_role_detail_code;
    const user                      = await reset_password(object, token, manager_role_detail_code);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("RESET_PASSWORD_FAILED", err.message);
    }
    return res.responseError("RESET_PASSWORD_FAILED", err);
  }
};

module.exports = resetPasswordHandler;