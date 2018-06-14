const mongoose = require('mongoose');

const User_Schema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String,
  },
  role_type : {
   type: String
  },
  display_name: {
    type: String
  },
  info : {
    name: {
      type: String
    },
    passport: {
      type: String
    },
    address: {
      type: String
    },
    phone_number: {
      type: String
    },
  },
  token:{
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

const Users = mongoose.model('users', User_Schema);
module.exports = Users;