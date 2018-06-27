const permissions = require('../../models/permissions');
const roleServices= require('../roles');

module.exports = (object) => {
  return roleServices.get_role_from_type({type: object.role})
  .then(role => {
    if(role.status == 0) return Promise.reject("Disabled role");
    return permissions.findById(object.id).then(per => {
      if(!per || per.status == 0) return Promise.reject('Invalid/Disabled permissions id');
      return per;
    });
  })
  .then(per => {
    const index = per.role.indexOf(object.role);
    if(index !== -1) return Promise.reject(`Role ${object.role} already has this permission`);
    per.role.push(object.role);
    per.save();
    return per;
  });
};