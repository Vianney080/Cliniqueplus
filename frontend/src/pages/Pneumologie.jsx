// src/pages/Pneumologie.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Pneumologie.css';
import pneumoImage from '../assets/pneumologie.jpg'; 
import ChatBotWidget from '../components/ChatBotWidget';

export default function Pneumologie() {
  const { t } = useTranslation();

  return (
    <div className="pneumologie-page">
      <div className="cover-image">
        <img src={pneumoImage} alt={t("pneumologie")} />
        <div className="overlay-text">
          <h1>{t("pneumologie")}</h1>
          <p>{t("desc_pneumologie")}</p>
        </div>
      </div>

      <div className="content-container">
        <div className="card">
          <h3>🫁 {t("pneumologie_examens")}</h3>
          <p>{t("pneumologie_examens_desc")}</p>

          <h3>👨‍⚕️ {t("pneumologie_soins")}</h3>
          <p>{t("pneumologie_soins_desc")}</p>

          <h3>📊 {t("pneumologie_suivi")}</h3>
          <p>{t("pneumologie_suivi_desc")}</p>

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
