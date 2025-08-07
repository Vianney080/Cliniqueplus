const express           = require('express');
const router            = express.Router();
const medecinController = require('../controllers/medecinController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); 
const rendezvousController = require('../controllers/rendezvousController');

// ↓   ADMIN UNIQUEMENT
router.post('/', verifyToken, isAdmin, medecinController.ajouterMedecin);
router.put('/:id',    verifyToken, isAdmin, medecinController.modifierMedecin);
router.delete('/:id', verifyToken, isAdmin, medecinController.supprimerMedecin);

// ↓   Accessible à tout le monde
router.get('/', medecinController.listerMedecins);

// ↓   Accessible uniquement aux médecins connectés
router.patch('/profil/:userId', verifyToken, medecinController.modifierProfilMedecinConnecte);

//modifier rendez vous
router.patch('/:id', verifyToken, rendezvousController.modifierRendezVous);
router.get('/:medecinId/rendezvous', verifyToken, rendezvousController.getRendezVousMedecin);
router.patch('/rendezvous/:id/status', verifyToken, rendezvousController.updateRendezVousStatus);

module.exports = router;
