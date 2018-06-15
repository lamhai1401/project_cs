const router          = require('express').Router();
const user_controller = require('../controller/users');

router.post('/create', user_controller.create);
router.post('/login', user_controller.login);
router.post('/find', user_controller.find);
router.post('/list', user_controller.list);
router.patch('/password/change', user_controller.change_pass);
router.patch('/password/reset', user_controller.reset);
router.patch('/disable', user_controller.disable);
router.patch('/enable', user_controller.enable);
router.patch('/role/change', user_controller.change_role);
router.put('/update', user_controller.update);
module.exports = router;