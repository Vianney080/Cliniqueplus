// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Dashboard.css';

export default function Dashboard() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('username');
    setUsername(stored || '');
  }, []);

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="avatar-circle mb-3">
          <span>{getInitial(username)}</span>
        </div>
        <h1>{t('dashboard_title')}, {username}</h1>
        <p>{t('dashboard_subtitle')}</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>{t('dashboard_card_rdv_title')}</h3>
          <p>{t('dashboard_card_rdv_text')}</p>
          <button>{t('dashboard_card_rdv_btn')}</button>
        </div>

        <div className="card">
          <h3>{t('dashboard_card_profile_title')}</h3>
          <p>{t('dashboard_card_profile_text')}</p>
          <button>{t('dashboard_card_profile_btn')}</button>
        </div>

        <div className="card">
          <h3>{t('dashboard_card_settings_title')}</h3>
          <p>{t('dashboard_card_settings_text')}</p>
          <button>{t('dashboard_card_settings_btn')}</button>
        </div>
      </div>
    </div>
  );
}
