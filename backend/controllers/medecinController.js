const Medecin = require('../models/Medecin');

// Créer un médecin
exports.ajouterMedecin = async (req, res) => {
  try {
    const nouveauMedecin = new Medecin(req.body);
    await nouveauMedecin.save();
    res.status(201).json({ message: 'Médecin ajouté', medecin: nouveauMedecin });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Lister tous les médecins
exports.listerMedecins = async (req, res) => {
  try {
    const medecins = await Medecin.find();
    res.json(medecins);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Modifier un médecin
exports.modifierMedecin = async (req, res) => {
  try {
    const medecin = await Medecin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medecin) return res.status(404).json({ message: 'Médecin non trouvé' });
    res.json({ message: 'Médecin modifié', medecin });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Supprimer un médecin
exports.supprimerMedecin = async (req, res) => {
  try {
    const medecin = await Medecin.findByIdAndDelete(req.params.id);
    if (!medecin) return res.status(404).json({ message: 'Médecin non trouvé' });
    res.json({ message: 'Médecin supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


exports.modifierProfilMedecinConnecte = async (req, res) => {
  const { userId } = req.params;
  const { specialite, telephone, disponibilites } = req.body;

  try {
    const updatedMedecin = await Medecin.findOneAndUpdate(
      { userId }, // ← on utilise userId (lié au compte User)
      { specialite, telephone, disponibilites },
      { new: true }
    );

    if (!updatedMedecin) {
      return res.status(404).json({ error: "Médecin non trouvé" });
    }

    res.json(updatedMedecin);
  } catch (err) {
    console.error("Erreur lors de la mise à jour du profil médecin :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
