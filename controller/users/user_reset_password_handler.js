const reset_password = require('../../services/users/user_reset_password');

const resetPasswordHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    const object = {
      email: req.body.email,
      password: req.body.password,
    };
    const manager_role_id           = req.body.manager_role_id;
    const manager_role_detail_code  = req.body.manager_role_detail_code;
    const user                      = await reset_password(object, manager_role_id, manager_role_detail_code);
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