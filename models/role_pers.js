const mongoose = require('mongoose');

const role_pers_schema = new mongoose.Schema({
  id_role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles'
  },
  group: {
    type: String
  },
  url: {
    type: String
  },
  name: {
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

const role_pers = mongoose.model('role_pers', role_pers_schema);
module.exports = role_pers;