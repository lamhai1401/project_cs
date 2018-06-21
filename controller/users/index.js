const user_login  = require('./user_login_handler');
const user_change_password = require('./user_change_password_handler');
// const user_change_password = require('./user_change_password_handler');
module.exports = {
  login: user_login,
  change_password: user_change_password
}