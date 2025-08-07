// services/emailService.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Transporteur Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

/**
 * Envoie un e-mail de confirmation de rendez-vous.
 * @param {string} to        – e-mail du patient
 * @param {string} medecin   – nom du médecin
 * @param {string} date      – AAAA-MM-JJ
 * @param {string} heure     – HH:mm
 */
exports.envoyerConfirmation = async (to, medecin, date, heure) => {
  try {
    await transporter.sendMail({
      from: '"Clinique+" <no-reply@clinique.local>',
      to,
      subject: 'Confirmation de votre rendez-vous',
      text: `Votre rendez-vous avec le Dr ${medecin} est confirmé pour le ${date} à ${heure}.`
    });
    console.log('✅ Email envoyé à :', to);
  } catch (err) {
    console.error('❌ Erreur email :', err.message);
  }
};
