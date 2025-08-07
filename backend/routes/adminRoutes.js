const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const rendezvousController = require('../controllers/rendezvousController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');


router.get('/utilisateurs', verifyToken, isAdmin, adminController.getAllUsers);
router.delete('/utilisateur/:id', verifyToken, isAdmin, adminController.deleteUser);
router.put('/utilisateur/:id', verifyToken, adminController.modifierUtilisateur);
router.post('/utilisateur', verifyToken, isAdmin, adminController.ajouterUtilisateur);

router.post('/medecin', verifyToken, isAdmin, adminController.ajouterMedecin);
router.get('/medecins', verifyToken, isAdmin, adminController.getAllMedecins);
router.patch('/medecin/:id/specialite', verifyToken, isAdmin, adminController.modifierSpecialite);
router.delete('/medecin/:id', verifyToken, isAdmin, adminController.supprimerMedecin);
router.put('/medecin/:id', verifyToken, isAdmin, adminController.updateMedecin);

// ADMIN : Rendez-vous
router.get('/rendezvous', verifyToken, isAdmin, adminController.getAllRendezVous);
router.post('/rendezvous', verifyToken, isAdmin, adminController.ajouterRendezVous);
router.patch('/rendezvous/:id', verifyToken, isAdmin, adminController.modifierRendezVous);
router.patch('/rendezvous/:id/annuler', verifyToken, isAdmin, adminController.annulerRendezVous);
router.delete('/rendezvous/:id', verifyToken, isAdmin, adminController.supprimerRendezVous);

router.get('/rendezvous', verifyToken, isAdmin, rendezvousController.getAllRendezVous);



module.exports = router;
