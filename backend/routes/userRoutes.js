// routes/userRoutes.js
const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Liste de tous les utilisateurs (admin uniquement)
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // sans mot de passe
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
