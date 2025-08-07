
import React from 'react';
import { useTranslation } from 'react-i18next';
import './CalendrierMedecin.css';

export default function CalendrierMedecin() {
  const { t } = useTranslation();

  return (
    <div className="calendrier-container">
      <header className="calendrier-header">
        <h1>{t('calendrier_medecin_title')}</h1>
        <p>{t('calendrier_medecin_subtitle')}</p>
      </header>

      <div className="calendrier-content">
        <div className="placeholder-calendar">
          📅 {t('calendrier_medecin_placeholder')}
        </div>
      </div>
    </div>
  );
}
