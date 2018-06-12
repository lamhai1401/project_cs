const create = require('../store/user_create');
const express = require('express');
const router = express.Router();

const createHandler = async (req, res, next) => {
  try {
    if(!req.body) return res.responseError("INVALID_INPUT_PARAM", "Input cannot be empty !!!");
    const object = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      display_name: req.body.display_name,
      info: {
        name: req.body.name,
        passport: req.body.passport,
        address: req.body.address,
      },
    };
    const user_role_id             = req.body.user_role_id;
    const user_role_detail_code = req.body.user_role_detail_code;
    const user = await create(object, user_role_id, user_role_detail_code);
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

router.post("/create", createHandler);

module.exports = router;