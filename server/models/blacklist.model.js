const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  token: {type: String, required: true, unique: true},
},
{versionkey: false});

const blacklistModel = mongoose.model("blacklisttoken", blacklistSchema);

module.exports = blacklistModel