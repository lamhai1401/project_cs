const mongoose = require('mongoose');

const roles_schema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String // ví dụ Admin, Moderator
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

const Role = mongoose.model('roles', roles_schema);
module.exports = Role;