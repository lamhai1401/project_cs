const list = require('../../services/users/user_list');

const createHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    
    // check token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
    };

    // create new object
    const manager_role_detail_code = req.body.manager_role_detail_code;
    const user = await list(token, manager_role_detail_code);
    res.responseSuccess({success: true, data: user});
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