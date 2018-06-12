const reset_password = require('../store/user_reset_password');
const express = require('express');
const router = express.Router();

const resetPasswordHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    const object = {
      email: req.body.email,
      password: req.body.password,
    };
    const user_role_id = req.body.user_role_id;
    const user_role_detail_code = req.body.user_role_detail_code;
    const user = await reset_password(object, user_role_id, user_role_detail_code);
    res.responseSuccess({success: true, data: user});
    next();
  }
  catch(err) {
    if(err.message) {
      return res.responseError("LOGIN_FAILED", err.message);
    }
    return res.responseError("LOGIN_FAILED", err);
  }
};

router.post("/resetpassword", resetPasswordHandler);

module.exports = router;