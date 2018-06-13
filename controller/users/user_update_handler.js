const update = require('../../services/users/user_update');

const resetPasswordHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    const object = {
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
      name: req.body.name,
      password: req.body.password,
      display_name: req.body.display_name
    };
    const user = await update(object);
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