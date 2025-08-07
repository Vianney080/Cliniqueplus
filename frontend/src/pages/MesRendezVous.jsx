import React, { useEffect, useState } from 'react';
import './MesRendezVous.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function MesRendezVous() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
    const fetchRdvs = async () => {
      const token = localStorage.getItem('token');
      const patientId = localStorage.getItem('userId');

      try {
        const res = await fetch(`http://localhost:5000/api/rendezvous/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setRdvs(data);
      } catch (error) {
        console.error('Erreur lors du chargement des rendez-vous', error);
      }
    };

    fetchRdvs();
  }, []);

  const handleAnnulation = async (rdvId) => {
    if (!window.confirm(t('confirmer_annulation'))) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/rendezvous/annuler/${rdvId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setRdvs((prev) =>
          prev.map((rdv) =>
            rdv._id === rdvId ? { ...rdv, statut: 'annulé' } : rdv
          )
        );
      } else {
        alert(t('erreur_annulation'));
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  const handleModifier = (rdv) => {
  localStorage.setItem('rdvAModifier', JSON.stringify(rdv));
  navigate(`/modifier-rendezvous/${rdv._id}`);
  };

  return (
    <div className="mes-rdv-container">
      <header className="dashboard-header">
        <h1>{t('mes_rendezvous')}</h1>
      </header>

      <table className="rdv-table">
        <thead>
          <tr>
            <th>{t('nom_medecin')}</th>
            <th>{t('specialite')}</th>
            <th>{t('date')}</th>
            <th>{t('heure')}</th>
            <th>{t('statut')}</th>
            <th>{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {rdvs.map((rdv, index) => (
            <tr key={index}>
              <td>{rdv.medecin?.nom || '—'}</td>
              <td>{rdv.medecin?.specialite || '—'}</td>
              <td>{rdv.date}</td>
              <td>{rdv.heure}</td>
              <td>{t(rdv.statut)}</td>
              <td>
                {rdv.statut !== 'annulé' ? (
                  <>
                    <button
                      className="btn-annuler"
                      onClick={() => handleAnnulation(rdv._id)}
                    >
                      {t('annuler')}
                    </button>
                    <button
                      className="btn-modifier"
                      onClick={() => handleModifier(rdv)}
                    >
                      {t('modifier')}
                    </button>
                  </>
                ) : (
                  <span className="annule-text">{t('annulé')}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
