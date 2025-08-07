import React, { useEffect, useState } from 'react';
import './ModifierRendezVous.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ModifierRendezVous() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    date: '',
    heure: '',
    motif: '',
    medecin: ''
  });
  const [medecins, setMedecins] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRendezVous = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`http://localhost:5000/api/rendezvous/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setFormData({
            date: data.date,
            heure: data.heure,
            motif: data.motif,
            medecin: data.medecin?._id || '',
          });
        } else {
          setError(t('erreur_recuperation_rdv'));
        }
      } catch (err) {
        setError(t('erreur_recuperation_rdv'));
      }
    };

    const fetchMedecins = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/medecins');
        const data = await res.json();
        setMedecins(data);
      } catch (err) {
        console.error('Erreur chargement médecins', err);
      }
    };

    fetchRendezVous();
    fetchMedecins();
  }, [id, t]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/rendezvous/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(t('rendezvous_modifie'));
        setTimeout(() => navigate('/mes-rendezvous'), 1500);
      } else {
        setError(data.message || 'Erreur');
      }
    } catch (err) {
      setError('Erreur réseau');
    }
  };

  return (
    <div className="modifier-rdv-container">
      <h2>{t('modifier_rendezvous')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('selectionner_medecin')}</label>
          <select name="medecin" value={formData.medecin} onChange={handleChange} required>
            <option value="">-- {t('selectionner_medecin')} --</option>
            {medecins.map((med) => (
              <option key={med._id} value={med._id}>
                {med.nom} - {med.specialite}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{t('date')}</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t('heure')}</label>
          <input type="time" name="heure" value={formData.heure} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Motif</label>
          <textarea name="motif" value={formData.motif} onChange={handleChange} rows="3" />
        </div>
        <button type="submit" className="btn-modifier-submit">
          {t('enregistrer_modifications')}
        </button>
        {message && <div className="message-success">{message}</div>}
        {error && <div className="message-error">{error}</div>}
      </form>
    </div>
  );
}
