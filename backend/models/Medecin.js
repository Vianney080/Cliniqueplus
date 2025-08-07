const mongoose = require('mongoose');

const medecinSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  nom: String,              // ← AJOUTÉ
  email: String,
  specialite: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  disponibilites: [
    {
      jour: String,
      heures: [String]
    }
  ]
});

module.exports = mongoose.model('Medecin', medecinSchema);
