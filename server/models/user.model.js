const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['admin', 'user'], default: 'user'},
},
{versionkey: false});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;