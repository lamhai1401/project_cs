const enable_user = require('../../services/admins/unblock_user');

const enable_user_handler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");

    const object = {
      email: req.body.email,
    };
    const user = await enable_user(object);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("USER_ENABLE_FAILED", err.message);
    }
    return res.responseError("USER_ENABLE_FAILED", err);
  }
};

module.exports = enable_user_handler;