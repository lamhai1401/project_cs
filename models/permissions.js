const mongoose = require('mongoose');

const permissions_schema = new mongoose.Schema({
  role: [{
    type: String
  }],
  url: {
    type: String
  },
  name: {
    type: String
  },
  desc: {
    type: String
  },
  method: {
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

const permissions = mongoose.model('permissions', permissions_schema);
module.exports = permissions;


// const list_pers = [
//   {
//     role: ['ADMIN'],
//     url: "/users/block",
//     name: "Block User",
//     desc: "Use this for block an available user",
//     method: "PATCH"
//   },
//   {
//     role: ['ADMIN'],
//     url: "/users/unblock",
//     name: "Unblock user",
//     desc: "Use this for unblock any user",
//     method: "PATCH"
//   },
//   {
//     role: ['ADMIN'],
//     url: "/users",
//     name: "Create User",
//     desc: "Use this for create new user",
//     method: "POST"
//   },
//   {
//     role: ['ADMIN'],
//     url: "/users",
//     name: "List User",
//     desc: "Use this for get list user",
//     method: "GET"
//   },
//   {
//     role: ['ADMIN'],
//     url: "/users",
//     name: "Update User",
//     desc: "Use this for update user",
//     method: "PATCH"
//   },
//   {
//     role: ['ADMIN'],
//     url: "/users/password/reset",
//     name: "Reset password user",
//     desc: "Use this for reset password of any user",
//     method: "PATCH"
//   },
//   {
//     role: ['ADMIN'],
//     url: "/roles",
//     name: "List Roles",
//     desc: "Use this for get list of roles",
//     method: "GET"
//   },
// ];