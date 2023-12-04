const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  created:{
    type: Date,
    default: Date.now
  }
});


loginSchema.plugin(passportLocalMongoose);

const Login = mongoose.model('logins', loginSchema);
module.exports = Login;
