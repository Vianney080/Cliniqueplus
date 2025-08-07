require('dotenv').config();
const app       = require('./app');
const connectDB = require('./config/db');   // importe la fonction

// 1) Connexion à la base
connectDB();

// 2) Lancement d’Express quand tout est prêt
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` API Clinique+ sur le port ${PORT}`));
