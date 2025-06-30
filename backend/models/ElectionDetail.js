const mongoose = require("mongoose");

const ElectionDetailSchema = new mongoose.Schema({
  electionPost: { type: String, required: true },
  location: { type: String, required: true },
  linkName: { type: String, required: true },
  message: { type: String, required: true },
  isEnded: { type: Boolean, default: false }, // ✅ added this line
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ElectionDetail", ElectionDetailSchema);
