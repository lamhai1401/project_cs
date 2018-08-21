const router              = require('express').Router();
const krypto_controller   = require('../controller/kryptos');

router.post("/account/detail", krypto_controller.get_account_detail);
router.post("/reset/2fa", krypto_controller.reset_2fa);
router.post("/reset/sms", krypto_controller.sms);
router.post("/account/histories", krypto_controller.get_login_histories);
router.post("/kyc/update/status", krypto_controller.kyc_status);
router.post("/kyc/update/detail", krypto_controller.kyc_detail);
router.post("/withdraw/update/status", krypto_controller.withdraw_status);

module.exports = router;