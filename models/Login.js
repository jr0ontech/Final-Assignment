const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const Logins = mongoose.model('logins', loginSchema);

module.exports = Logins;
