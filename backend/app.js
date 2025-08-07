const express = require('express');
const cors    = require('cors');
require('dotenv').config();
const iaRoutes = require('./routes/iaRoutes');

const authRoutes       = require('./routes/authRoutes');
const medecinRoutes    = require('./routes/medecinRoutes');
const rendezvousRoutes = require('./routes/rendezvousRoutes');
const userRoutes       = require('./routes/userRoutes');
const adminRoutes      = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Monte toutes les routes
app.use('/api/auth',       authRoutes);
app.use('/api/medecins',   medecinRoutes);
app.use('/api/rendezvous', rendezvousRoutes);
app.use('/api/users',      userRoutes);
app.use('/api/admin',      adminRoutes);
app.use('/api/ia', iaRoutes);

module.exports = app;
