const router          = require('express').Router();
const user_controller = require('../controller/users');

router.post("/login", user_controller.login);
router.post("/activities", user_controller.activitiy_histories);
router.put("/password/change", user_controller.change_password);
module.exports = router;