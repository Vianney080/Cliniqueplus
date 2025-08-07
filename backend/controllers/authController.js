const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Medecin = require('../models/Medecin');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const TokenReset = require('../models/TokenReset');
const nodemailer = require('nodemailer');
require('dotenv').config();






exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    specialite,
    telephone,
    disponibilites
  } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role
    });

    await newUser.save();

    // Cas médecin uniquement
    if (role === 'medecin') {
      if (!specialite || !telephone || !disponibilites) {
        return res.status(400).json({ error: 'Champs médecin manquants.' });
      }

      const newMedecin = new Medecin({
        userId: newUser._id,
        email: email.toLowerCase(),
        nom: name,
        specialite,
        telephone,
        disponibilites
      });

      await newMedecin.save();
    }

    // Supprimer le mot de passe du retour
    const { password: _, ...userSafe } = newUser._doc;

    res.status(201).json({
      message: 'Inscription réussie.',
      user: userSafe
    });

  } catch (err) {
    console.error('❌ Erreur interne :', err);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

/*exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Identifiants invalides.' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userSafe } = user._doc;

    res.json({
      token,
      user: userSafe
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Identifiants invalides.' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...userSafe } = user._doc;

    let medecinInfo = null;

    if (user.role === 'medecin') {
      const medecin = await Medecin.findOne({ userId: user._id });
      if (medecin) {
        medecinInfo = {
          _id: medecin._id,
          nom: medecin.nom,
          specialite: medecin.specialite
        };
      }
    }

    res.json({
      token,
      user: userSafe,
      medecin: medecinInfo  // ← utile côté frontend
    });

  } catch (err) {
    console.error("Erreur de login :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Envoi de lien
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

    const token = crypto.randomBytes(32).toString('hex');
    await new TokenReset({ userId: user._id, token }).save();

    const resetLink = `http://localhost:3000/reset-password/${token}`; // à adapter si déploiement

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Réinitialisation de mot de passe',
      html: `
        <p>Bonjour ${user.name},</p>
        <p>Voici votre lien de réinitialisation :</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Ce lien expire dans 1 heure.</p>
      `
    });

    res.json({ message: 'Lien envoyé par email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// Traitement du lien
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const tokenDoc = await TokenReset.findOne({ token });
    if (!tokenDoc) return res.status(400).json({ error: 'Lien invalide ou expiré.' });

    const user = await User.findById(tokenDoc.userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();
    await TokenReset.deleteOne({ token });

    res.json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};



