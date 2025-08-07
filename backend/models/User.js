const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['patient', 'medecin', 'admin'], // tous les rôles permis
    default: 'patient',
    required: true
  }
}, { timestamps: true }); //   pour suivi date création/modif

module.exports = mongoose.model('User', userSchema);
