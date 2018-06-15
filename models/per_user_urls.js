const mongoose = require('mongoose');

const per_user_urls_schema = new mongoose.Schema({
  name: {
    type: String
  },
  url: {
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

const per_user_urls = mongoose.model('per_user_urls', per_user_urls_schema);
module.exports = per_user_urls;