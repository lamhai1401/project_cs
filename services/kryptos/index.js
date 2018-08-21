const get     = require('./get');
const reset   = require('./reset');
const update  = require('./update');

module.exports = {
  get_account_detail: get.account_detail,
  get_login_histories: get.login_histories,
  reset_2fa: reset.google_auth,
  reset_sms: reset.sms,
  update_kyc_status: update.kyc_status,
  update_kyc_detail: update.kyc_detail,
  update_withdraw_status: update.withdraw_status
};