const router            = require('express').Router();
const roles_controller  = require('../controller/roles');

router.post("/create", roles_controller.create);
router.post("/detail/create", roles_controller.roles_detail_create);

module.exports = router;