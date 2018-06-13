const router          = require('express').Router();
const user_controller = require('../controller/users');

router.post("/create", user_controller.create);
router.post("/delete", user_controller.delete);
router.post('/login', user_controller.login);
router.patch('/password/change', user_controller.change);
router.patch('/password/reset', user_controller.reset);

module.exports = router;