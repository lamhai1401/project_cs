const mongoose = require('mongoose');

const Acitivities_Schema = new mongoose.Schema({
  support_email: {
    type: String
  },
  ticket_id: {
    type: String
  },
  activitiy: {
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

const Activities = mongoose.model('activities', Acitivities_Schema);

module.exports = Activities;
