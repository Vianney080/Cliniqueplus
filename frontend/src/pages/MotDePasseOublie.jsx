// src/pages/MotDePasseOublie.jsx
import React, { useState } from 'react';
import './MotDePasseOublie.css';
import { useTranslation } from 'react-i18next';
import ChatBotWidget from '../components/ChatBotWidget'; // Composant du chatbot

export default function MotDePasseOublie() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success ou error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessageType('success');
        setMessage(t('mdp_oublie.email_envoye'));
        setEmail('');
      } else {
        setMessageType('error');
        setMessage(data.error || t('mdp_oublie.erreur'));
      }
    } catch (err) {
      setMessageType('error');
      setMessage(t('mdp_oublie.erreur'));
    }
  };

  return (
    <div className="mdp-container">
      <h2>{t('mdp_oublie.titre')}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">{t('mdp_oublie.label')}</label>
        <input
          type="email"
          id="email"
          placeholder={t('mdp_oublie.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{t('mdp_oublie.bouton')}</button>
        {message && (
          <p className={messageType === 'success' ? 'message-success' : 'message-error'}>
            {message}
          </p>
        )}
      </form>
      <ChatBotWidget />
    </div>
  );
}
