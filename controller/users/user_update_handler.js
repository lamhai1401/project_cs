const update = require('../../services/users/user_update');

const resetPasswordHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    
    // check token
    const manager = req.body.manager;
    const object = {
      name: req.body.name,
      type: req.body.type
    };
    const user = await update(object, manager);
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