const mongoose = require('mongoose');

const Roles_Schema = new mongoose.Schema({
  name: {
    type: String
  },
  roles_detail: [{
    name:   {type: String},
    code:   {type: String},
    status: {type: String},
    created_at: {
      type: String,
      default: Date.now()
    },
    updated_at: {
      type: String,
      default: Date.now()
    }
  }], 
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

const Role = mongoose.model('roles', Roles_Schema);
module.exports = Role;