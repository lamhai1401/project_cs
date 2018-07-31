const get                 = require('./get');
const update              = require('./update');
const create_user         = require('./create_user_handler');
const add_pers            = require('./add_pers_handler');
const remove_pers         = require('./remove_pers_handler');

module.exports = {
  // get
  list_user   : get.list_users,
  list_role   : get.list_role,
  list_pers   : get.list_pers,
  // update
  update      : update.update_user,
  block       : update.block_user,
  unblock     : update.unblock_user,
  reset       : update.reset_password,

  add_pers    : add_pers,
  remove_pers : remove_pers,
  create      : create_user,
};