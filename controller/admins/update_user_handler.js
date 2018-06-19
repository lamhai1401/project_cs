const update = require('../../services/users/user_update');

const resetPasswordHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    
    // check token
    const object = {
      name: req.body.name,
      type: req.body.role,
      email: req.body.email
    };
    const user = await update(object);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("USER_UPDATE_FAILED", err.message);
    }
    return res.responseError("USER_UPDATE_FAILED", err);
  }
};

module.exports = resetPasswordHandler;