const list = require('../../services/users/user_list');

const list_user_handler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");

    const list_user = await list();
    res.responseSuccess({success: true, data: list_user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("LIST_USER_FAILED", err.message);
    }
    return res.responseError("LIST_USER_FAILED", err);
  }
};

module.exports = list_user_handler;