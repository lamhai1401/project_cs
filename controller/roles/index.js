const roles_create        = require('./roles_create_handler');
const roles_detail_create = require('./roles_detail_create_handler');
module.exports = {
  create: roles_create,
  roles_detail_create: roles_detail_create,
}