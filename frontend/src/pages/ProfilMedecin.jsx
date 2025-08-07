// src/pages/ProfilProfessionnelMedecin.jsx
import React, { useState, useEffect } from 'react';
import './ProfilProfessionnelMedecin.css';
import { useTranslation } from 'react-i18next';

export default function ProfilProfessionnelMedecin() {
  const { t } = useTranslation();
  const [specialite, setSpecialite] = useState('');
  const [telephone, setTelephone] = useState('');
  const [disponibilites, setDisponibilites] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMedecin = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/medecins/${user._id}`);
        const data = await res.json();
        if (data) {
          setSpecialite(data.specialite || '');
          setTelephone(data.telephone || '');
          setDisponibilites(data.disponibilites || '');
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user?._id) fetchMedecin();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch(`http://localhost:5000/api/medecins/profil/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ specialite, telephone, disponibilites })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(t('profil_mise_a_jour_succes'));
      } else {
        setError(data.error || t('profil_mise_a_jour_echec'));
      }
    } catch (err) {
      setError(t('profil_mise_a_jour_echec'));
    }
  };

  return (
    <div className="profil-container">
      <h2>{t('profil_titre')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('profil_specialite')}</label>
          <input type="text" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
        </div>
        <div className="form-group">
          <label>{t('profil_telephone')}</label>
          <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <div className="form-group">
          <label>{t('profil_disponibilites')}</label>
          <input type="text" value={disponibilites} onChange={(e) => setDisponibilites(e.target.value)} />
        </div>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">{t('profil_bouton')}</button>
      </form>
    </div>
  );
}
