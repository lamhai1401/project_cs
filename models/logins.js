const mongoose = require('mongoose');

const Login_Schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref:   'accounts'
  },
  role_type: {
    type: String
  },
  name: {
    type: String
  },
  display_name: {
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

const Login = mongoose.model('logins', Login_Schema);
module.exports = Login;