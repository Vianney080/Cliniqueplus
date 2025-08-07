
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Connexion.css';
import { useTranslation } from 'react-i18next';
import ChatBotWidget from '../components/ChatBotWidget'; 

export default function Connexion() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t('connexion_error'));
        return;
      }

      // Vérification que les infos essentielles sont présentes
      if (!data.token || !data.user || !data.user.role) {
        setError(t('connexion_error'));
        return;
      }

      // Sauvegarde locale
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('username', data.user.name);
      if (data.user.role === 'medecin' && data.medecin && data.medecin._id) {
      localStorage.setItem('medecinId', data.medecin._id);
     }


      // Redirection selon le rôle
      if (data.user.role === 'admin') {
        navigate('/dashboard-admin');
      } else if (data.user.role === 'medecin') {
        navigate('/dashboard-medecin');
      } else {
        navigate('/dashboard-patient');
      }
    } catch (err) {
      console.error('Erreur serveur :', err);
      setError(t('connexion_server_error'));
    }
  };

  return (
    <div className="connexion-page">
      <form className="connexion-form" onSubmit={handleSubmit}>
        <h2>{t('connexion_title')}</h2>

        <input
          type="email"
          placeholder={t('connexion_email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={t('connexion_password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">{t('connexion_button')}</button>

        <p className="bottom-links">
          {t('connexion_no_account')} <a href="/inscription">{t('connexion_register_link')}</a><br />
          <a href="/mot-de-passe-oublie">{t('connexion_forgot_password')}</a>
        </p>
      </form>
      <ChatBotWidget />
    </div>
  );
}
