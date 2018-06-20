const find = require('../../services/admins/find_user');

const createHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    // create new object
    const object = {
      id: req.params.id,
    };
    const user = await find(object);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("USER_FIND_FAILED", err.message);
    }
    return res.responseError("USER_FIND_FAILED", err);
  }
};

module.exports = createHandler;