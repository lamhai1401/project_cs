const mongoose = require('mongoose');

const per_role_urls_schema = new mongoose.Schema({
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

const per_role_urls = mongoose.model('per_role_urls', per_role_urls_schema);
module.exports = per_role_urls;