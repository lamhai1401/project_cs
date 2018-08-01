const get         = require('./get');
const updateUser  = require('./update');
const create      = require('./create');
const log_in      = require('./login');
const add_pers    = require('./add_permissions');
const remove_pers = require('./remove_permissions');

module.exports = {
  list_users:   get.list_users,
  get_user:     get.get_user,
  create_user:  create.new_user,
  update_user:  updateUser,
  log_in:       log_in,
  add_pers:     add_pers,
  remove_pers:  remove_pers
};