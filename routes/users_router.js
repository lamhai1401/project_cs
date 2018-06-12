const router        = require('express').Router();
const user_create_router  = require('../controller/users/handler/user_create_handler');
const user_login_router   = require('../controller/users/handler/user_login_handler');

router.use('/users', [
  user_create_router,
  user_login_router,
]);

module.exports = router;