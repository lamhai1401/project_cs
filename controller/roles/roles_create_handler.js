const create = require('../../services/roles/roles_create');

const createHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    const object = {
      role_name: req.body.role_name,
      type: req.body.type,
      roles_detail: {
        roles_detail_name: req.body.roles_detail_name,
        code: req.body.roles_detail_code
      }
    };
    const manager_role_id             = req.body.manager_role_id;
    const manager_role_detail_code    = req.body.manager_role_detail_code;
    const user = await create(object, manager_role_id, manager_role_detail_code);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("CREATED_FAILED", err.message);
    }
    return res.responseError("CREATED_FAILED", err);
  }
};

module.exports = createHandler;