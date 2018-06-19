const mongoose = require('mongoose');

const Login_Schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:   'users'
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  login_at: {
    type: String,
    default: Date.now()
  },
  status: {
    type: String,
    default: 1
  }
});

const Login = mongoose.model('history_logins', Login_Schema);
module.exports = Login;