const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  aadhar: { type: String, required: true, unique: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  votedAt: { type: Date, default: Date.now },
}, {
  collection: 'votes',
});

module.exports = mongoose.model('Vote', voteSchema);
