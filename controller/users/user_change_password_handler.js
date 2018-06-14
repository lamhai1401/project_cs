const change_password = require('../../services/users/user_change_password');

const change_password_handler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    
    // check token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
    };
    const object = {
      password: req.body.password,
    };
    const user   = await change_password(object, token);
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