const change_password = require('../../services/users/user_change_password');

const change_password_handler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    const object = {
      email: req.body.email,
      password: req.body.password,
    };
    const user   = await change_password(object, manager_role_id, manager_role_detail_code);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("CHANGE_PASSWORD_FAILED", err.message);
    }
    return res.responseError("CHANGE_PASSWORD_FAILED", err);
  }
};

module.exports = change_password_handler;