const get     = require('./get');
const reset   = require('./reset');
const update  = require('./update');
module.exports = {
  get_account_detail: get.account_detail,
  get_login_histories: get.login_hisrories,
  reset_2fa: reset.google_auth,
  sms: reset.sms,
  kyc_status: update.kyc_status,
  kyc_detail: update.kyc_detail,
  withdraw_status: update.withdraw_status
};