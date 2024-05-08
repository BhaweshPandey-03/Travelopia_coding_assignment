const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // phone_number: { type: String, required: true },
  destination: { type: String, required: true },
  interest: { type: String, required: true },
  travelers: { type: String, required: true },
  budget: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String },
  userId: { type: String }
}, { timestamps: true, versionKey: false });

const enquiryModel = mongoose.model('enquirie', enquirySchema);
module.exports = enquiryModel;