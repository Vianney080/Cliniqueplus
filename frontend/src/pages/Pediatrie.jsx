// src/pages/Pediatrie.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import pediatrieImage from '../assets/pediatrie.jpg';
import './Pediatrie.css';
import ChatBotWidget from '../components/ChatBotWidget';

export default function Pediatrie() {
  const { t } = useTranslation();

  return (
    <div className="pediatrie-page">
      <div className="cover-image">
        <img src={pediatrieImage} alt={t("pediatrie")} />
        <div className="overlay-text">
          <h1>{t("pediatrie")}</h1>
          <p>{t("desc_pediatrie")}</p>
        </div>
      </div>

      <div className="content-container">
        <div className="card">
          <h3>🧒 {t("pediatrie_soins")}</h3>
          <p>{t("pediatrie_soins_desc")}</p>

          <h3>👨‍👩‍👧 {t("pediatrie_accompagnement")}</h3>
          <p>{t("pediatrie_accompagnement_desc")}</p>

          <h3>💉 {t("pediatrie_vaccins")}</h3>
          <p>{t("pediatrie_vaccins_desc")}</p>

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
