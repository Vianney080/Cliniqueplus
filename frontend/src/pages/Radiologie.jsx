// src/pages/Radiologie.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import radiologieImage from '../assets/radiologie1.jpg';
import './Radiologie.css';
import ChatBotWidget from '../components/ChatBotWidget';

export default function Radiologie() {
  const { t } = useTranslation();

  return (
    <div className="radiologie-page">
      <div className="cover-image">
        <img src={radiologieImage} alt={t("radiologie")} />
        <div className="overlay-text">
          <h1>{t("radiologie")}</h1>
          <p>{t("desc_radiologie")}</p>
        </div>
      </div>

      <div className="content-container">
        <div className="card text-center">
          <h3>🖼️ {t("radiologie_section1_titre")}</h3>
          <p>{t("radiologie_section1_contenu")}</p>

          <h3>👨‍⚕️ {t("radiologie_section2_titre")}</h3>
          <p>{t("radiologie_section2_contenu")}</p>

          <h3>📋 {t("radiologie_section3_titre")}</h3>
          <p>{t("radiologie_section3_contenu")}</p>

          <Link to="/rendezvous" className="btn-rdv">
            {t("rendezvous")}
          </Link>
        </div>
      </div>
      <ChatBotWidget />
    </div>
  );
}
