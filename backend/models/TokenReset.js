const mongoose = require('mongoose');

const tokenResetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // expire dans 1h
});

module.exports = mongoose.model('TokenReset', tokenResetSchema);