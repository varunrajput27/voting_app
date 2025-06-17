const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  aadhar: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: String,
  profilepic: Buffer,
  partysign: Buffer,
  partyslogan: String,
  message: String,
  votes: { type: Number, default: 0 },
  votedAadhars: [String],
});

module.exports = mongoose.model('Candidate', candidateSchema);
