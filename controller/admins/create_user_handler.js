const create = require('../../services/users/user_create');

const createHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");

    // create new object
    const object = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      role_type: req.body.role
    };
    const user = await create(object);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("CREATED_USER_FAILED", err.message);
    }
    return res.responseError("CREATED_USER_FAILED", err);
  }
};

module.exports = createHandler;