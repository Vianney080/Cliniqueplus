
const RendezVous = require('../models/RendezVous');
const User       = require('../models/User');
const Medecin    = require('../models/Medecin');
const { envoyerConfirmation } = require('../services/emailService');


exports.prendreRendezVous = async (req, res) => {
  try {
    const { patient, medecin, date, heure, motif } = req.body;

    // Vérifie si le patient a déjà un RDV à ce moment-là
    const doublonPatient = await RendezVous.findOne({
      patient,
      date,
      heure,
      statut: 'programmé'
    });

    if (doublonPatient) {
      return res.status(409).json({ message: 'Vous avez déjà un rendez-vous à cette heure.' });
    }

    // Vérifie si le médecin est déjà occupé à cette heure
    const dejaPris = await RendezVous.findOne({
      medecin,
      date,
      heure,
      statut: 'programmé'
    });

    if (dejaPris) {
      return res.status(409).json({ message: 'Ce créneau est déjà réservé avec ce médecin.' });
    }

    // Crée le RDV
    const nouveauRDV = new RendezVous({
      patient,
      medecin,
      date,
      heure,
      motif,
      statut: 'programmé'
    });

    await nouveauRDV.save();

    // Répondre immédiatement au frontend
    res.status(201).json({ message: 'Rendez-vous pris avec succès.', rendezVous: nouveauRDV });

    // Envoi de l'email en tâche de fond
    setTimeout(async () => {
      try {
        const patientDoc = await User.findById(patient);
        const medecinDoc = await Medecin.findById(medecin);
        if (patientDoc && medecinDoc) {
          await envoyerConfirmation(patientDoc.email, medecinDoc.nom, date, heure);
          console.log(`✅ Email envoyé à ${patientDoc.email}`);
        }
      } catch (err) {
        console.error(`❌ Erreur email vers ${patientDoc?.email || 'inconnu'} :`, err.message);
      }
    }, 100);

  } catch (error) {
    console.error('Erreur prise RDV:', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};



exports.mesRendezVous = async (req, res) => {
  try {
    const rdvs = await RendezVous.find({ patient: req.params.id })
                                 .populate('medecin'); /*populate remplace l’ID par les infos du médecin */
    res.json(rdvs);
  } catch (e) {
    res.status(500).json({ message: 'Erreur serveur', error: e.message });
  }
};

exports.tousLesRendezVous = async (_req, res) => {
  try {
    const rdvs = await RendezVous.find()
                                 .populate('patient')
                                 .populate('medecin');
    res.json(rdvs);
  } catch (e) {
    res.status(500).json({ message: 'Erreur serveur', error: e.message });
  }
};

// controllers/rendezVousController.js
exports.annulerRendezVous = async (req, res) => {
  try {
    const rdvId = req.params.id;

    const rdv = await RendezVous.findById(rdvId);
    if (!rdv) {
      return res.status(404).json({ message: "Rendez-vous non trouvé." });
    }

    rdv.statut = 'annulé';
    await rdv.save();

    res.status(200).json({ message: "Rendez-vous annulé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'annulation :", error);
    res.status(500).json({ message: "Erreur lors de l'annulation du rendez-vous." });
  }
};



exports.getRendezVousDuPatient = async (req, res) => {
  const patientId = req.params.id;

  try {
    const rendezvous = await RendezVous.find({ patient: patientId })
      .populate('medecin', 'nom specialite') // ← ici on récupère les champs du médecin
      .sort({ date: 1, heure: 1 });

    res.status(200).json(rendezvous);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des rendez-vous' });
  }
};


exports.getRendezVousById = async (req, res) => {
  try {
    const rdv = await RendezVous.findById(req.params.id)
      .populate('medecin')
      .populate('patient');

    if (!rdv) {
      return res.status(404).json({ message: 'Rendez-vous introuvable' });
    }

    res.json(rdv);
  } catch (error) {
    console.error("Erreur lors de la récupération du rendez-vous", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


/*exports.modifierRendezVous = async (req, res) => {
  try {
    const { date, heure, motif, medecin } = req.body;

    const rdv = await RendezVous.findByIdAndUpdate(
      req.params.id,
      { date, heure, motif, medecin },
      { new: true }
    );

    if (!rdv) {
      return res.status(404).json({ message: 'Rendez-vous introuvable' });
    }

    res.json({ message: 'Rendez-vous modifié avec succès', rendezVous: rdv });
  } catch (error) {
    console.error("Erreur modification RDV :", error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};*/

exports.modifierRendezVous = async (req, res) => {
  const { id } = req.params;
  const { date, heure, motif } = req.body;

  try {
    const rendezVous = await RendezVous.findById(id);
    if (!rendezVous) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé.' });
    }

    // Vérification des conflits
    const conflit = await RendezVous.findOne({
      _id: { $ne: id }, // exclut le rendez-vous actuel
      medecin: rendezVous.medecin,
      date,
      heure,
      statut: 'programmé',
    });

    if (conflit) {
      return res.status(409).json({ message: 'Rendez-vous déjà existant à cette date et heure.' });
    }

    // Mise à jour des champs
    rendezVous.date = date;
    rendezVous.heure = heure;
    rendezVous.motif = motif;

    await rendezVous.save();
    res.status(200).json(rendezVous);
  } catch (error) {
    console.error('Erreur modification:', error);
    res.status(500).json({ message: 'Erreur lors de la modification.' });
  }
};


// Récupérer les rendez-vous d'un médecin
exports.getRendezVousMedecin = async (req, res) => {
  try {
    const rendezvous = await RendezVous.find({ 
      medecin: req.params.medecinId,
      statut: { $ne: 'annulé' } // Exclure les RDV annulés
    })
    .populate('patient', 'name email')
    .sort({ date: 1, heure: 1 });
    
    res.json(rendezvous);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous" });
  }
};
// Mettre à jour le statut d'un rendez-vous
exports.updateRendezVousStatus = async (req, res) => {
  try {
    const { statut } = req.body;
    const rdv = await RendezVous.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    );
    if (!rdv) {
      return res.status(404).json({ message: "Rendez-vous non trouvé" });
    }
    res.json(rdv);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du statut" });
  }
};

exports.getAllRendezVous = async (req, res) => {
  try {
    const rendezvous = await RendezVous.find()
      .populate('patient', 'name email')
      .populate('medecin', 'name specialite')
      .sort({ date: 1, heure: 1 });
    res.json(rendezvous);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous" });
  }
};