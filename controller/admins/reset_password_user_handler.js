const reset_password = require('../../services/admins/reset_password_user');

const resetPasswordHandler = async (req, res, next) => {
  try {
    
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    
    const object = {
      email: req.body.email,
      new_password: req.body.new_password,
    };

    const user = await reset_password(object);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("USER_RESET_PASSWORD_FAILED", err.message);
    }
    return res.responseError("USER_RESET_PASSWORD_FAILED", err);
  }
};

module.exports = resetPasswordHandler;