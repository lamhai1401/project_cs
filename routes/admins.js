const router            = require('express').Router();
const admin_controller  = require('../controller/admins');

router.get("/users", admin_controller.list_user);
router.get("/roles", admin_controller.list_role);
router.get("/permissions", admin_controller.list_pers);
router.patch("/permissions", admin_controller.add_pers);
router.post("/users", admin_controller.create);
router.post("/reset/2fa", admin_controller.reset_2fa);
router.patch("/users/block", admin_controller.block);
router.patch("/users/unblock", admin_controller.unblock);
router.patch("/users", admin_controller.update);
router.patch("/users/password/reset", admin_controller.reset);
router.delete("/permissions", admin_controller.remove_pers);

module.exports = router;