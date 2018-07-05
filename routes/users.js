const router          = require('express').Router();
const user_controller = require('../controller/users');

router.post('/login', user_controller.login);
router.post('/account/detail', user_controller.account_detail);
router.post('/reset/sms', user_controller.reset_sms);
router.put("/password/change", user_controller.change_password);
module.exports = router;