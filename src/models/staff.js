const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, index: true },
  dob: { type: Date, required: true },
  address: { type: String },
  createdOn: { type: Date, default: Date.now },
  department: { type: String, sparse: true },
  designation: { type: String, sparse: true }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;