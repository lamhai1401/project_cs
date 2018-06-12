const router        = require('express').Router();
const user_create_router = require('../controller/users/handler/user_create_handler');

router.use('/users', [
  user_create_router,
]);

module.exports = router;