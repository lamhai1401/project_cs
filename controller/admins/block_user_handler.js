const disable_user = require('../../services/admins/block_user');

const disable_user_handler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");

    const object = {
      email: req.body.email,
    };
    const user = await disable_user(object);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("DISABLE_FAILED", err.message);
    }
    return res.responseError("DISABLE", err);
  }
};

module.exports = disable_user_handler;