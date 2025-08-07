import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Composants
import Header from './components/Header';
import Footer from './components/Footer';
import Laboratoire from './pages/Laboratoire';
import Urgences from './pages/Urgences';
import Radiologie from './pages/Radiologie';
import Pharmacie from './pages/Pharmacie';
import Pneumologie from './pages/Pneumologie';
import Cardiologie from './pages/Cardiologie';
import Pediatrie from './pages/Pediatrie';
import Contact from './pages/Contact';
import RendezVous from './pages/RendezVous';
import Connexion from  './pages/Connexion';
import Inscription from './pages/Inscription';
import Dashboard from './pages/Dashboard';
import DashboardMedecin from './pages/DashboardMedecin';
import DashboardPatient from './pages/DashboardPatient';
import CalendrierMedecin from './pages/CalendrierMedecin';
import StatistiquesMedecin from './pages/StatistiquesMedecin';
import ParametresMedecin from './pages/ParamètresMédecin';
import ProfilMedecin from './pages/ProfilMedecin';
import MesRendezVous from './pages/MesRendezVous';
import ModifierRendezVous from './pages/ModifierRendezVous';
import DashboardAdmin from './pages/DashboardAdmin';
import AdminRoute from './components/AdminRoute';
import RendezVousMedecin from './pages/RendezVousMedecin';
import MotDePasseOublie from './pages/MotDePasseOublie';
import ResetPassword from './pages/ResetPassword';
import ChatIA from './pages/ChatIA';




import Accueil from './pages/Accueil';
import Page404 from './pages/Page404';

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Accueil />} />
          {/* Ici vous ajouterez d’autres routes comme Connexion, Dashboard, etc. */}
          <Route path="*" element={<Page404 />} />
          <Route path="/laboratoire" element={<Laboratoire />} />
          <Route path="/urgences" element={<Urgences />} />
          <Route path="/radiologie" element={<Radiologie />} />
          <Route path="/pharmacie" element={<Pharmacie />} />
          <Route path="/pneumologie" element={<Pneumologie />} />
          <Route path="/cardiologie" element={<Cardiologie />} />
          <Route path="/pediatrie" element={<Pediatrie />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rendezvous" element={<RendezVous />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-medecin" element={<DashboardMedecin />} />
          <Route path="/dashboard-patient" element={<DashboardPatient />} />
          <Route path="/calendrier-disponibilite" element={<CalendrierMedecin />} />
          <Route path="/statistiques" element={<StatistiquesMedecin />} />
          <Route path="/parametres" element={<ParametresMedecin />} />

          <Route path="/profil-professionnel" element={<ProfilMedecin />} />
          <Route path="/mes-rendezvous" element={<MesRendezVous />} />
          <Route path="/modifier-rendezvous/:id" element={<ModifierRendezVous />} />
          <Route path="/rendezvous-medecin" element={<RendezVousMedecin />} />
          <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />  
          <Route path="/reset-password/:token" element={<ResetPassword />} />
           <Route path="/chat-ia" element={<ChatIA />} />

          <Route
            path="/dashboard-admin"
            element={
              <AdminRoute>
                <DashboardAdmin />
              </AdminRoute>
            }
          />

          {/* Ajoutez d'autres routes pour les pages restantes */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
