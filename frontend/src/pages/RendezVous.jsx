import React, { useRef, useState, useEffect } from 'react';
import './RendezVous.css';
import { useTranslation } from 'react-i18next';
import rdvImage from '../assets/rendezvous.png';
import ChatBotWidget from '../components/ChatBotWidget';

export default function RendezVous() {
  const { t } = useTranslation();
  const formRef = useRef();

  const [isConnected, setIsConnected] = useState(false);
  const [medecins, setMedecins] = useState([]);
  const [success, setSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Vérifie si l'utilisateur est connecté + charge les médecins
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    setIsConnected(!!token && !!userId);

    fetch('http://localhost:5000/api/medecins')
      .then(res => res.json())
      .then(data => setMedecins(data))
      .catch(() => setMedecins([]));
  }, []);

  const sendAppointment = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const token = localStorage.getItem('token');
    const patientId = localStorage.getItem('userId');
    const medecinId = form.medecin.value;

    if (!patientId || !token) {
      setErrorMsg(t("veuillez_connecter"));
      return;
    }

    const appointment = {
      patient: patientId,
      medecin: medecinId,
      date: form.date.value,
      heure: form.time.value,
      motif: form.message.value,
      email: form.email.value
    };

    try {
      const response = await fetch('http://localhost:5000/api/rendezvous', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(appointment)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setErrorMsg('');
        form.reset();
      } else {
        setSuccess(false);
        if (result.message === "Vous avez déjà un rendez-vous à cette heure.") {
          setErrorMsg(t('rendezvous_deja_patient'));
        } else if (result.message === "Ce créneau est déjà réservé avec ce médecin.") {
          setErrorMsg(t('rendezvous_creneau_occupe'));
        } else {
          setErrorMsg(t('rendezvous_error'));
        }
      }
    } catch (error) {
      setSuccess(false);
      setErrorMsg(t('rendezvous_error'));
    }
  };

  return (
    <div className="rendezvous-page">
      {/* Image d'en-tête */}
      <div className="cover-image">
        <img src={rdvImage} alt="Rendez-vous" />
        <div className="overlay-text">
          <h1>{t('rendezvous')}</h1>
          <p>{t('rendezvous_intro')}</p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="form-container">
        {!isConnected ? (
          <p className="error">{t('veuillez_connecter')}</p>
        ) : (
          <form ref={formRef} onSubmit={sendAppointment}>
            <input type="text" name="name" placeholder={t('contact_name')} required />
            <input type="email" name="email" placeholder={t('contact_email')} required />
            <input type="tel" name="phone" placeholder={t('contact_phone')} required />

            {/* Liste dynamique des médecins */}
            <select name="medecin" required>
              <option value="">{t('choisir_medecin')}</option>
              {medecins.map((m) => (
                <option key={m._id} value={m._id}>
                  Dr {m.nom} – {m.specialite}
                </option>
              ))}
            </select>

            <input type="date" name="date" required />
            <input type="time" name="time" required />
            <textarea name="message" placeholder={t('contact_message')} rows="4" required />
            <button type="submit">{t('rendezvous_envoyer')}</button>

            {success && <p className="success">{t('rendezvous_success')}</p>}
            {success === false && errorMsg && (
              <p className="error-message">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
        <ChatBotWidget />
    </div>
  );
}
