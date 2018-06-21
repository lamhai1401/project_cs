const roles_model = require('../../models/roles');

module.exports = (object) => {
  return new Promise((resolve, reject) => {
    roles_model.findOne({_id: object.id}, (err, role) => {
      if(err) return reject(err.message);
      resolve(role);
    });
  });
};