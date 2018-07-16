const router          = require('express').Router();
const user_controller = require('../controller/users');

router.post("/login", user_controller.login);
router.post("/account/detail", user_controller.account_detail);
router.post("/account/histories", user_controller.account_histories);
router.post("/reset/sms", user_controller.reset_sms);
router.post("/activities", user_controller.activitiy_histories);
router.put("/password/change", user_controller.change_password);
module.exports = router;