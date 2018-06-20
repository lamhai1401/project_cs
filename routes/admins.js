const router            = require('express').Router();
const admin_controller  = require('../controller/admins');
const admin_dispatacher = require('../middleware/admin_dispatcher');

// router.use(admin_dispatacher);
router.get("/users", admin_controller.list);
router.post("/users", admin_controller.create);
router.patch("/users/find", admin_controller.find);
router.patch("/users/block", admin_controller.block);
router.patch("/users/block", admin_controller.unblock);
router.patch("/users", admin_controller.update);
router.patch("users/password/reset", admin_controller.reset);
router.get('/users/v2', admin_controller.list_users);

module.exports = router;