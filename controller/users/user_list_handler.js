const list = require('../../services/users/user_list');

const createHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");

    const list_user = await list();
    res.responseSuccess({success: true, data: list_user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("USER_LIST_FAILED", err.message);
    }
    return res.responseError("USER_LIST_FAILED", err);
  }
};

module.exports = createHandler;