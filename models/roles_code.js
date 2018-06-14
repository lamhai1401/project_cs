const mongoose = require('mongoose');

const roles_code_schema = new mongoose.Schema({
  roles_detail_name: {
    type: String
  },
  code: {
    type: String
  },
  status: {
    type: String,
    default: 1
  },
  created_at: {
    type: String,
    default: Date.now()
  },
  updated_at: {
    type: String,
    default: Date.now()
  }
});

const roles_code = mongoose.model('roles_code', roles_code_schema);
module.exports = roles_code;