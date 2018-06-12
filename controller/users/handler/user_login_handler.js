const login = require('../store/user_login');
const express = require('express');
const router = express.Router();

const loginHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    const object = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await login(object);
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

router.post("/login", loginHandler);

module.exports = router;