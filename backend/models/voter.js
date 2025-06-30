const mongoose = require('mongoose');
const voterSchema = new mongoose.Schema({
  aadhar: String,
  dob: String,
 
});

const voter = mongoose.model('voter', voterSchema);
module.exports = voter;


