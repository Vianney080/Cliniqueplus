import React, { useEffect, useState } from 'react';
import './DashboardMedecin.css';
import { useTranslation } from 'react-i18next';

export default function DashboardMedecin() {
  const { t } = useTranslation();
  const [medecinName, setMedecinName] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.name) setMedecinName(userData.name);
  }, []);

  return (
    <div className="dashboard-medecin-container">
      <header className="dashboard-header">
        <h1>{t('dashboard_medecin_title')}, {medecinName}</h1>
        <p>{t('dashboard_medecin_subtitle')}</p>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h3>{t('medecin_card_rdv_title')}</h3>
          <p>{t('medecin_card_rdv_text')}</p>
          <button onClick={() => window.location.href = '/rendezvous-medecin'}>
            {t('medecin_card_rdv_btn')}
          </button>
        </div>

        <div className="card">
          <h3>{t('medecin_card_profile_title')}</h3>
          <p>{t('medecin_card_profile_text')}</p>
          <button onClick={() => window.location.href = '/profil-professionnel'}>
            {t('medecin_card_profile_btn')}
          </button>
        </div>

        <div className="card">
          <h3>{t('medecin_card_calendar_title')}</h3>
          <p>{t('medecin_card_calendar_text')}</p>
          <button onClick={() => window.location.href = '/calendrier-disponibilite'}>
            {t('medecin_card_calendar_btn')}
          </button>
        </div>

        <div className="card">
          <h3>{t('medecin_card_stats_title')}</h3>
          <p>{t('medecin_card_stats_text')}</p>
          <button onClick={() => window.location.href = '/statistiques'}>
            {t('medecin_card_stats_btn')}
          </button>
        </div>

        <div className="card">
          <h3>{t('medecin_card_settings_title')}</h3>
          <p>{t('medecin_card_settings_text')}</p>
          <button onClick={() => window.location.href = '/parametres'}>
            {t('medecin_card_settings_btn')}
          </button>
        </div>
      </div>
    </div>
  );
}
