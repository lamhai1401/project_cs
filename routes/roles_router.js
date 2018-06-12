const router        = require('express').Router();
const roles_create_router = require('../controller/roles/handler/roles_create_handler');

router.use('/roles', [
  roles_create_router
]);

module.exports = router;