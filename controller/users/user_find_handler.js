const find = require('../../services/users/user_find');

const createHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    
    // create new object
    const object = {
      id: req.params
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