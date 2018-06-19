const router          = require('express').Router();
const user_controller = require('../controller/users');

router.post('/login', user_controller.login);
router.post('/create', user_controller.create);
// router.post('/find', user_controller.find);
router.get('/', user_controller.list);
router.patch('/changepassword', user_controller.changepassword);
router.patch('/resetpassword', user_controller.resetpassword);
router.patch('/disable', user_controller.disable);
router.patch('/enable', user_controller.enable);
// router.patch('/role/change', user_controller.change_role);
router.put('/update', user_controller.update);
module.exports = router;