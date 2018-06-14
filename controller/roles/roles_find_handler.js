const find = require('../../services/roles/roles_find');

const find_roles_handler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    
    // check token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.responseFailAuth("UNAUTHORIZED_ERROR", "You need to log in to do it");
    };

    const object = {
      type: req.body.type,
    };
    const manager_role_detail_code    = req.body.manager_role_detail_code;
    const user = await find(object, token, manager_role_detail_code);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("ROLES_FIND_FAILED", err.message);
    }
    return res.responseError("ROLES_FIND_FAILED", err);
  }
};

module.exports = find_roles_handler;