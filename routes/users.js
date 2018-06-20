const router          = require('express').Router();
const user_controller = require('../controller/users');

router.post('/login', user_controller.login);
// router.patch('/password/change', user_controller.changepassword);
module.exports = router;