// controllers/adminController.js

const User = require('../models/User');
const Medecin = require('../models/Medecin');
const RendezVous = require('../models/RendezVous');
const bcrypt = require('bcryptjs');


//  Voir tous les utilisateurs (patients + admins)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//  Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

//  Ajouter un médecin

exports.ajouterMedecin = async (req, res) => {
  try {
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Créer le User
    const nouvelUtilisateur = new User({
      name: req.body.nom,
      email: req.body.email,
      password: hashedPassword,
      role: 'medecin'
    });
    await nouvelUtilisateur.save();

    // Créer le Médecin lié
    const nouveauMedecin = new Medecin({
      userId: nouvelUtilisateur._id,
      nom: req.body.nom,
      email: req.body.email,
      specialite: req.body.specialite,
      telephone: req.body.telephone
    });
    await nouveauMedecin.save();

    res.status(201).json(nouveauMedecin);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout", error: error.message });
  }
};


//  Voir tous les médecins
exports.getAllMedecins = async (req, res) => {
  try {
    const medecins = await Medecin.find();
    res.json(medecins);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//  Modifier la spécialité d’un médecin
exports.modifierSpecialite = async (req, res) => {
  try {
    const medecin = await Medecin.findById(req.params.id);
    if (!medecin) return res.status(404).json({ message: "Médecin introuvable" });

    medecin.specialite = req.body.specialite || medecin.specialite;
    await medecin.save();
    res.json(medecin);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour" });
  }
};


exports.modifierUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(updatedUser);
  } catch (err) {
    console.error("Erreur modification:", err);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
  }
}


exports.supprimerMedecin = async (req, res) => {
  try {
    const deleted = await Medecin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Médecin introuvable" });
    res.json({ message: "Médecin supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};


exports.getAllRendezVous = async (req, res) => {
  try {
    const rendezvous = await RendezVous.find()
      .populate('patient', 'name email')
      .populate('medecin', 'nom specialite');
    res.json(rendezvous);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous" });
  }
};

//  Fonction pour modifier les infos d’un médecin
exports.updateMedecin = async (req, res) => {
  try {
    const medecin = await Medecin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!medecin) {
      return res.status(404).json({ message: 'Médecin non trouvé' });
    }

    res.status(200).json(medecin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err });
  }
};

exports.ajouterUtilisateur = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const nouveauUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await nouveauUser.save();
    res.status(201).json(nouveauUser);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de l'ajout de l'utilisateur",
      error: error.message,
    });
  }
};


 //Ajouter RDV
exports.ajouterRendezVous = async (req, res) => {
  try {
    const { date, heure, motif, patient, medecin } = req.body;
    const nouveauRdv = new RendezVous({ date, heure, motif, patient, medecin });
    await nouveauRdv.save();
    res.status(201).json({ message: 'Rendez-vous ajouté avec succès', rendezVous: nouveauRdv });
  } catch (error) {
    res.status(500).json({ message: 'Erreur ajout', error: error.message });
  }
};

//  Modifier RDV
exports.modifierRendezVous = async (req, res) => {
  try {
    const { date, heure, motif, medecin } = req.body;
    const rdv = await RendezVous.findByIdAndUpdate(
      req.params.id,
      { date, heure, motif, medecin },
      { new: true }
    );
    if (!rdv) return res.status(404).json({ message: 'Rendez-vous introuvable' });
    res.json({ message: 'Rendez-vous modifié avec succès', rendezVous: rdv });
  } catch (error) {
    res.status(500).json({ message: 'Erreur modification', error: error.message });
  }
};

//  Annuler RDV
exports.annulerRendezVous = async (req, res) => {
  try {
    const rdv = await RendezVous.findByIdAndUpdate(
      req.params.id,
      { statut: 'annulé' },
      { new: true }
    );
    if (!rdv) return res.status(404).json({ message: 'Rendez-vous introuvable' });
    res.json({ message: 'Rendez-vous annulé avec succès', rendezVous: rdv });
  } catch (error) {
    res.status(500).json({ message: 'Erreur annulation', error: error.message });
  }
};

//  Supprimer RDV
exports.supprimerRendezVous = async (req, res) => {
  try {
    const rdv = await RendezVous.findByIdAndDelete(req.params.id);
    if (!rdv) return res.status(404).json({ message: 'Rendez-vous introuvable' });
    res.json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression', error: error.message });
  }
};