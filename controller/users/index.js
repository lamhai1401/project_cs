const user_login            = require('./user_login_handler');
const user_change_password  = require('./user_change_password_handler');
const reset_sms             = require('./reset_sms');
const account_detail        = require('./get_account_detail');
const account_histories     = require('./get_account_histories');
const activitiy_histories   = require('./get_activity_histories');

module.exports = {
  login: user_login,
  account_detail: account_detail,
  change_password: user_change_password,
  reset_sms: reset_sms,
  account_histories: account_histories,
  activitiy_histories: activitiy_histories
};