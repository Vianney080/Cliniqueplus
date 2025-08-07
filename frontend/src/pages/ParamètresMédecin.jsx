// src/pages/ParametresMedecin.jsx
import React from 'react';
import './ParametresMedecin.css';
import { useTranslation } from 'react-i18next';

export default function ParametresMedecin() {
  const { t, i18n } = useTranslation();

  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('langue', e.target.value);
  };

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    localStorage.setItem('theme', theme);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.body.className = theme === 'system' ? (systemTheme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark') : theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  };

  return (
    <div className="parametres-container">
      <h2>{t('medecin_parametres_title')}</h2>
      <p>{t('medecin_parametres_subtitle')}</p>

      <div className="parametres-section">
        <h4>{t('medecin_parametres_langue')}</h4>
        <select onChange={handleLangChange} defaultValue={localStorage.getItem('langue') || 'fr'}>
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>

      <div className="parametres-section">
        <h4>{t('medecin_parametres_theme')}</h4>
        <select onChange={handleThemeChange} defaultValue={localStorage.getItem('theme') || 'system'}>
          <option value="light">☀️ {t('theme_clair')}</option>
          <option value="dark">🌙 {t('theme_sombre')}</option>
          <option value="system">🖥️ {t('theme_systeme')}</option>
        </select>
      </div>

      <div className="parametres-section">
        <h4>{t('medecin_parametres_password')}</h4>
        <button className="btn btn-warning">{t('changer_mot_de_passe')}</button>
      </div>
    </div>
  );
}
