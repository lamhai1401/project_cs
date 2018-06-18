const reset_password = require('../../services/users/user_reset_password');

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
      return res.responseError("RESET_PASSWORD_FAILED", err.message);
    }
    return res.responseError("RESET_PASSWORD_FAILED", err);
  }
};

module.exports = resetPasswordHandler;