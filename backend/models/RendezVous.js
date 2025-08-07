// models/RendezVous.js
const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema(
  {
    patient : {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
      required: true
    },
    medecin : {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Medecin',
      required: true
    },
    date    : { type: String, required: true },   // format YYYY-MM-DD
    heure   : { type: String, required: true },   // format HH:mm
    motif   : String,
    statut  : {
      type: String,
      enum: ['programmé', 'annulé'],
      default: 'programmé'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('RendezVous', rendezVousSchema);
