// src/pages/Cardiologie.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Cardiologie.css';
import cardioImage from '../assets/cardiologie.jpg';
import ChatBotWidget from '../components/ChatBotWidget';
export default function Cardiologie() {
  const { t } = useTranslation();

  return (
    <div className="cardiologie-page">
      <div className="cover-image">
        <img src={cardioImage} alt={t("cardiologie")} />
        <div className="overlay-text">
          <h1>{t("cardiologie")}</h1>
          <p>{t("desc_cardiologie")}</p>
        </div>
      </div>

      <div className="content-container">
        <div className="card">
          <h3>❤️ {t("cardio_diagnostic")}</h3>
          <p>{t("cardio_diagnostic_desc")}</p>

          <h3>🩺 {t("cardio_traitement")}</h3>
          <p>{t("cardio_traitement_desc")}</p>

          <h3>📅 {t("cardio_suivi")}</h3>
          <p>{t("cardio_suivi_desc")}</p>

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
