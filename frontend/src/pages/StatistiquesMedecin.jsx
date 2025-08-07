
import React from 'react';
import { useTranslation } from 'react-i18next';
import './StatistiquesMedecin.css';

export default function StatistiquesMedecin() {
  const { t } = useTranslation();

  return (
    <div className="stats-container">
      <header className="stats-header">
        <h1>{t('statistiques_medecin_title')}</h1>
        <p>{t('statistiques_medecin_subtitle')}</p>
      </header>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>{t('stat_total_rdv')}</h3>
          <p>125</p>
        </div>
        <div className="stat-card">
          <h3>{t('stat_rdv_mois')}</h3>
          <p>34</p>
        </div>
        <div className="stat-card">
          <h3>{t('stat_patients_uniques')}</h3>
          <p>89</p>
        </div>
      </div>
    </div>
  );
}
