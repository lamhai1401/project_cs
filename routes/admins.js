const router            = require('express').Router();
const admin_controller  = require('../controller/admins');

// users
router.get("/users", admin_controller.list_user);
router.post("/users", admin_controller.create_user);
router.patch("/users/block", admin_controller.block);
router.patch("/users/unblock", admin_controller.unblock);
router.patch("/users", admin_controller.update);
router.patch("/users/password/reset", admin_controller.reset);

// roles
router.get("/roles", admin_controller.list_role);

// permissions
router.get("/permissions", admin_controller.list_pers);
router.patch("/permissions", admin_controller.add_pers);
router.delete("/permissions", admin_controller.remove_pers);

module.exports = router;