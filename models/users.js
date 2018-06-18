const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
  email : {
    type: String
  },
  password: {
    type: String
  },
  display_name: {
    type: String
  },
  name: {
    type: String
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

const Users = mongoose.model('users', user_schema);
module.exports = Users;