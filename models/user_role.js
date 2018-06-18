const mongoose = require('mongoose');

const user_roles_schema = new mongoose.Schema({
  id_role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles'
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
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

const user_roles = mongoose.model('user_roles', user_roles_schema);
module.exports = user_roles;