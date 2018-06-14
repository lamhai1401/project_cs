const roles_create        = require('./roles_create_handler');
const roles_find          = require('./roles_find_handler');
const roles_detail_create = require('./roles_detail_create_handler');
const roles_code_create   = require('./roles_code_create_handler');
module.exports = {
  create: roles_create,
  roles_detail_create: roles_detail_create,
  find: roles_find,
  roles_code_create: roles_code_create
}