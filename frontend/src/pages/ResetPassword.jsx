import React, { useState } from 'react';
import './ResetPassword.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirm) {
      setMessageType('error');
      setMessage(t('reset.erreur_confirmation'));
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessageType('success');
        setMessage(t('reset.succes'));
        setTimeout(() => navigate('/connexion'), 2500);
      } else {
        setMessageType('error');
        setMessage(data.error || t('reset.erreur'));
      }
    } catch (err) {
      setMessageType('error');
      setMessage(t('reset.erreur'));
    }
  };

  return (
    <div className="reset-container">
      <h2>{t('reset.titre')}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t('reset.nouveau')}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>{t('reset.confirm')}</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit">{t('reset.bouton')}</button>

        {message && (
          <p className={messageType === 'success' ? 'message-success' : 'message-error'}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
