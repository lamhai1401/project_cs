const user_create = require('./user_create_handler');
const user_disable = require('./user_disable_handler');
const user_enable = require('./user_enable_handler');
const user_login  = require('./user_login_handler');
const user_update = require('./user_update_handler');
const user_reset_password = require('./user_reset_password_handler');
const user_change_password = require('./user_change_password_handler');
module.exports = {
  create: user_create,
  disable: user_disable,
  enable: user_enable,
  login: user_login,
  update: user_update,
  reset: user_reset_password,
  change: user_change_password
}