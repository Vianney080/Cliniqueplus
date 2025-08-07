// src/pages/Urgences.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import urgenceImage from '../assets/urgence.jpg';
import './Urgences.css';
import ChatBotWidget from '../components/ChatBotWidget';

export default function Urgences() {
  const { t } = useTranslation();

  return (
    <div className="urgences-page">
      <div className="cover-image">
        <img src={urgenceImage} alt={t("urgences")} />
        <div className="overlay-text">
          <h1>{t("urgences")}</h1>
          <p>{t("desc_urgences")}</p>
        </div>
      </div>

      <div className="content-container">
        <div className="card text-center">
          <h3>🚨 {t("urgence_rapide_titre")}</h3>
          <p>{t("urgence_rapide_texte")}</p>

          <h3>👨‍⚕️ {t("urgence_equipe_titre")}</h3>
          <p>{t("urgence_equipe_texte")}</p>

          <h3>📍 {t("urgence_localisation_titre")}</h3>
          <p>{t("urgence_localisation_texte")}</p>

          <Link to="/rendezvous" className="btn btn-danger mt-4">
            {t("rendezvous")}
          </Link>
        </div>
      </div>
        <ChatBotWidget />
    </div>
  );
}
