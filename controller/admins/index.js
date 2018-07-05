const list_user           = require('./list_user_handler');
const list_role           = require('./get_list_role');
const list_pers           = require('./get_list_permissions');
const create_user         = require('./create_user_handler');
const block_user          = require('./block_user_handler');
const unblock_user        = require('./unblock_user_handler');
const update_user         = require('./update_user_handler');
const reset_password_user = require('./reset_password_user_handler');
const add_pers            = require('./add_pers_handler');
const remove_pers         = require('./remove_pers_handler');
module.exports = {
  list_user: list_user,
  list_role: list_role,
  list_pers: list_pers,
  add_pers: add_pers,
  remove_pers: remove_pers,
  create: create_user,
  block: block_user,
  unblock: unblock_user,
  update: update_user,
  reset: reset_password_user,
};