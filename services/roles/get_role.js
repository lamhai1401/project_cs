const roles_model = require('../../models/roles');
const string      = require('../../util/string');

module.exports = (object) => {
  return new Promise((resolve, reject) => {
    object.type = string.createcode(object.type);
    roles_model.findOne({type: object.type}, (err, role) => {
      if(err) return reject(err.message);
      resolve(role);
    });
  });
};