const user_create = require('./user_create_handler');
const user_delete = require('./user_delete_handler');
const user_login  = require('./user_login_handler');
const user_reset_password = require('./user_reset_password_handler');
const user_change_password = require('./user_change_password_handler');
module.exports = {
  create: user_create,
  delete: user_delete,
  login: user_login,
  reset: user_reset_password,
  change: user_change_password
}