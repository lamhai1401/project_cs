const mongoose = require('mongoose');

const Roles_Schema = new mongoose.Schema({
  role_name: { // ví dụ Admin, Excutive, Readonly
    type: String
  },
  type: { // ví dụ Admin, Excutive, Readonly
    type: String
  },
  roles_detail: [{
    roles_detail_name:   {type: String}, // ví dụ xóa user, thêm user
    code:   {type: String},
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