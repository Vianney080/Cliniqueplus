const express = require('express');
const router = express.Router();
const { chatbotIA } = require('../controllers/iaController');
const { recommanderMedecin } = require('../controllers/iaController');

router.post('/chatbot', chatbotIA);
router.post('/recommander-medecin', recommanderMedecin);

module.exports = router;
