const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvousController');
const { verifyToken } = require('../middlewares/authMiddleware');


// Routes simples pour la gestion des rendez-vous
router.post('/', rendezvousController.prendreRendezVous);
router.get('/patient/:id', rendezvousController.mesRendezVous);
router.get('/admin/all', rendezvousController.tousLesRendezVous);
router.delete('/:id', rendezvousController.annulerRendezVous);
router.get('/:id', verifyToken, rendezvousController.getRendezVousById);
router.patch('/:id', verifyToken, rendezvousController.modifierRendezVous);


router.patch('/annuler/:id', verifyToken, rendezvousController.annulerRendezVous);
router.get('/medecin/:medecinId', rendezvousController.getRendezVousMedecin);



module.exports = router;