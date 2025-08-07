const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: '📩 Nouveau message via Clinique+',
      text: `
👤 Nom : ${name}
📧 Email : ${email}
📱 Téléphone : ${phone}
💬 Message :
${message}
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Erreur d'envoi :", err);
    res.status(400).json({ success: false, message: "Erreur lors de l'envoi du message." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
