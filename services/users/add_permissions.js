const permissions = require('../../models/permissions');
const roleServices= require('../roles');

module.exports = (object) => {
  return roleServices.get_role_from_type({type: object.role})
  .then(role => {
    return permissions.findById(object.id).then(per => {
      if(!per) return Promise.reject('Invalid permissions id');
      return per;
    });
  })
  .then(per => {
    per.role.push(object.role);
    per.save();
    return per;
  });
};