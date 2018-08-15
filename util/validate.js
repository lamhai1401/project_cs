const validate = require('validate.js');

module.exports = (object = {}, constraints = {}) => {
  var err_str = '';
  const err = validate(object, constraints);
  if(err) {
    const arr = Object.values(err);
    arr.forEach(element => {
      err_str += element.reduce((pre, curr) => pre + ", " + curr);
      err_str += ". ";
    });
    return err_str;
  }
};
