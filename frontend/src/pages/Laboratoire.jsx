// src/pages/Laboratoire.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Laboratoire.css';
import laboImage from '../assets/laboratoire.jpg'; 
import ChatBotWidget from '../components/ChatBotWidget';

export default function Laboratoire() {
  const { t } = useTranslation();

  return (
    <div className="laboratoire-page">
      {/* Image de couverture */}
      <div className="cover-image">
        <img src={laboImage} alt={t("laboratoire_titre")} />
        <div className="overlay-text">
          <h1>{t("laboratoire_titre")}</h1>
          <p>{t("laboratoire_sous_titre")}</p>
        </div>
      </div>

      {/* Contenu */}
      <div className="content-container">
        <div className="card">
          <h3>🔬 {t("laboratoire_section1_titre")}</h3>
          <p>{t("laboratoire_section1_contenu")}</p>

          <h3>👩‍⚕️ {t("laboratoire_section2_titre")}</h3>
          <p>{t("laboratoire_section2_contenu")}</p>

          <h3>📋 {t("laboratoire_section3_titre")}</h3>
          <p>{t("laboratoire_section3_contenu")}</p>

          <div className="btn-container">
            <Link to="/rendezvous" className="btn-rdv">
              {t("rendezvous")}
            </Link>
          </div>
        </div>
      </div>
        <ChatBotWidget />
    </div>
  );
}
