const router        = require('express').Router();
const user_create_router  = require('../controller/users/handler/user_create_handler');
const user_login_router   = require('../controller/users/handler/user_login_handler');
const user_reset_password_router = require('../controller/users/handler/user_reset_password_handler');
router.use('/users', [
  user_create_router,
  user_login_router,
  user_reset_password_router,
]);

module.exports = router;