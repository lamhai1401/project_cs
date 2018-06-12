const mongoose = require('mongoose');

const Login_Schema = new mongoose.Schema({
  current_login: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref:   'accounts'
  },
  last_login: {
    type: String
  },
  status: {
    type: String,
    default: 1
  }
});

const Login = mongoose.model('logins', Login_Schema);
module.exports = Login;