const user_login  = require('./login');
const update      = require('./update');
const get         = require('./get');

module.exports = {
  login: user_login,
  change_password: update.change_password,
  activitiy_histories: get.activity_histories
};