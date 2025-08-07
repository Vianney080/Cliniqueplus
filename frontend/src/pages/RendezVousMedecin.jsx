import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import './MesRendezVous.css';

export default function RendezVousMedecin() {
  const { t } = useTranslation();
  const [rendezvous, setRendezvous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedRdv, setSelectedRdv] = useState(null);
  const [originalRdv, setOriginalRdv] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [filtreAvenir, setFiltreAvenir] = useState(false);

  const token = localStorage.getItem('token');
  const medecinId = localStorage.getItem('medecinId');

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/rendezvous/medecin/${medecinId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setRendezvous(data);
      } catch (err) {
        console.error('Erreur récupération RDV médecin :', err);
        setError(t('erreur_chargement_rdv'));
      } finally {
        setLoading(false);
      }
    };

    if (token && medecinId) {
      fetchRendezVous();
    }
  }, [token, medecinId, t]);

  const handleAnnulation = async (rdvId) => {
    if (!window.confirm(t('confirmer_annulation'))) return;
    try {
      const response = await fetch(`http://localhost:5000/api/rendezvous/annuler/${rdvId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setRendezvous(prev =>
          prev.map(rdv => rdv._id === rdvId ? { ...rdv, statut: 'annulé' } : rdv)
        );
        setMessage(t('annulation_succes'));
        setMessageType('success');
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 4000);
      } else {
        setMessage(t('erreur_annulation'));
        setMessageType('error');
      }
    } catch (error) {
      console.error('Erreur annulation:', error);
      setMessage(t('erreur_annulation'));
      setMessageType('error');
    }
  };

  const handleModification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/rendezvous/${selectedRdv._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedRdv.date,
          heure: selectedRdv.heure,
          motif: selectedRdv.motif,
        }),
      });

      if (response.ok) {
        setRendezvous(prev =>
          prev.map(rdv => rdv._id === selectedRdv._id ? selectedRdv : rdv)
        );
        setMessage(t('modification_succes'));
        setMessageType('success');
        setShowModifyModal(false);
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 4000);
      } else if (response.status === 409) {
        setMessage(t('conflit_rendezvous'));
        setMessageType('error');
      } else {
        setMessage(t('modification_echec'));
        setMessageType('error');
      }
    } catch (error) {
      console.error('Erreur modification:', error);
      setMessage(t('modification_echec'));
      setMessageType('error');
    }
  };

  const exporterPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(t('mes_rendezvous'), 20, 20);

    let y = 30;
    doc.setFontSize(10);
    doc.text("Date | Heure | Patient | Email | Motif | Statut", 20, y);
    y += 10;

    rendezvous.forEach(rdv => {
      const ligne = `${rdv.date} | ${rdv.heure} | ${rdv.patient?.name || t('inconnu')} | ${rdv.patient?.email || ''} | ${rdv.motif || ''} | ${t('statut_' + rdv.statut)}`;
      doc.text(ligne, 20, y);
      y += 10;
    });

    doc.save("rendezvous_medecin.pdf");
  };

  // ✅ filtre seulement les rendez-vous programmés à venir
  const rdvsAffiches = filtreAvenir
    ? rendezvous.filter(rdv =>
        rdv.statut === 'programmé' &&
        new Date(`${rdv.date}T${rdv.heure}`) > new Date()
      )
    : rendezvous; // ← affiche tout sinon

  return (
    <div className="rdv-medecin-container">
      <header className="dashboard-header">
        <h1>{t('mes_rendezvous')}</h1>
        <button onClick={() => setFiltreAvenir(!filtreAvenir)}>
          {t('filtrer_a_venir')}
        </button>
        <button onClick={exporterPDF}>🧾 {t('exporter_pdf')}</button>
      </header>

      {message && (
        <div className={`alert ${messageType}`}>
          {message}
        </div>
      )}

      {loading ? (
        <p className="loading">{t('chargement')}</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : rdvsAffiches.length === 0 ? (
        <p className="no-rdv">{t('aucun_rendezvous')}</p>
      ) : (
        <div className="rdv-table-container">
          <table className="rdv-table">
            <thead>
              <tr>
                <th>{t('date')}</th>
                <th>{t('heure')}</th>
                <th>{t('patient')}</th>
                <th>{t('email')}</th>
                <th>{t('motif')}</th>
                <th>{t('statut')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {rdvsAffiches.map((rdv) => (
                <tr key={rdv._id} className={rdv.statut === 'annulé' ? 'ligne-annulee' : ''}>
                  <td>{rdv.date}</td>
                  <td>{rdv.heure}</td>
                  <td>{rdv.patient?.name || t('inconnu')}</td>
                  <td>{rdv.patient?.email || '—'}</td>
                  <td>{rdv.motif || t('aucun')}</td>
                  <td className={rdv.statut === 'annulé' ? 'annule' : 'programme'}>
                    {t(`statut_${rdv.statut}`)}
                  </td>
                  <td>
                    {rdv.statut !== 'annulé' ? (
                      <>
                        <button
                          className="btn-modifier"
                          onClick={() => {
                            setSelectedRdv({ ...rdv });
                            setOriginalRdv({ ...rdv });
                            setShowModifyModal(true);
                          }}
                        >
                          {t('modifier')}
                        </button>
                        <button
                          className="btn-annuler"
                          onClick={() => handleAnnulation(rdv._id)}
                        >
                          {t('annuler')}
                        </button>
                      </>
                    ) : (
                      <span className="annule-action">{t('annule')}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal modification déjà en place ici, inchangé */}

      {showModifyModal && selectedRdv && (
        <div className="modal-overlay" onClick={() => setShowModifyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{t('modifier_rendezvous')}</h2>
            <form onSubmit={handleModification}>
              <div className="form-group">
                <label>{t('date')}</label>
                <input
                  type="date"
                  value={selectedRdv.date}
                  onChange={(e) => setSelectedRdv({ ...selectedRdv, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('heure')}</label>
                <input
                  type="time"
                  value={selectedRdv.heure}
                  onChange={(e) => setSelectedRdv({ ...selectedRdv, heure: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('motif')}</label>
                <textarea
                  value={selectedRdv.motif || ''}
                  onChange={(e) => setSelectedRdv({ ...selectedRdv, motif: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="submit">{t('enregistrer')}</button>
                <button type="button" onClick={() => setSelectedRdv({ ...originalRdv })}>
                  🔁
                </button>
                <button type="button" onClick={() => setShowModifyModal(false)}>
                  {t('annuler')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
