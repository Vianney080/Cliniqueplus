// src/pages/Pharmacie.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Pharmacie.css';
import pharmacieImage from '../assets/pharmacie.jpg';
import ChatBotWidget from '../components/ChatBotWidget';

export default function Pharmacie() {
  const { t } = useTranslation();

  return (
    <div className="pharmacie-page">
      <div className="cover-image">
        <img src={pharmacieImage} alt={t("pharmacie")} />
        <div className="overlay-text">
          <h1>{t("pharmacie")}</h1>
          <p>{t("desc_pharmacie")}</p>
        </div>
      </div>

      <div className="content-container">
        <div className="card">
          <h3>💊 {t("pharmacie_produits")}</h3>
          <p>{t("pharmacie_produits_desc")}</p>

          <h3>👩‍⚕️ {t("pharmacie_conseil")}</h3>
          <p>{t("pharmacie_conseil_desc")}</p>

          <h3>⏰ {t("pharmacie_horaires")}</h3>
          <p>{t("pharmacie_horaires_desc")}</p>

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
