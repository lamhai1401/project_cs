const list_users  = require('./list_users');
const getUser     = require('./get_user');
const updateUser  = require('./update');
const create_user = require('./create_user');
const log_in      = require('./user_login');
module.exports = {
  create_user: create_user,
  list_users: list_users,
  update_user: updateUser,
  get_user: getUser,
  log_in: log_in
}