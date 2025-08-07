
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import './Inscription.css';
import ChatBotWidget from '../components/ChatBotWidget';

export default function Inscription() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    specialite: '',
    telephone: '',
    disponibilites: '',
    code_securite: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.password.length < 6) {
      setError(t('register_error_password_length'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('register_password_mismatch'));
      return;
    }

    if (formData.role === 'medecin' && !formData.disponibilites.trim()) {
      setError(t('register_error_disponibilites_required'));
      return;
    }

    if (formData.role === 'admin' && formData.code_securite !== 'CLINIQUE2025') {
      setError(t('register_code_admin_invalid'));
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    if (formData.role === 'medecin') {
      payload.specialite = formData.specialite;
      payload.telephone = formData.telephone;

      const disponibilites = (formData.disponibilites || "").split('\n').map(line => {
        const [jour, heures] = line.split(':');
        return {
          jour: (jour || '').trim(),
          heures: (heures || '').split(',').map(h => h.trim())
        };
      });

      payload.disponibilites = disponibilites;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.includes('duplicate')) {
          throw new Error(t('register_error_email_exists'));
        }
        throw new Error(data.error || t('register_error_generic'));
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/connexion');
      }, 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>{t('register_title')}</h2>
        <form onSubmit={handleSubmit}>
          <label className="required">{t('register_name')}</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label className="required">{t('register_email')}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label className="required">{t('register_password')}</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label className="required">{t('register_confirm_password')}</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <label className="required">{t('register_role')}</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="patient">{t('register_role_patient')}</option>
            <option value="medecin">{t('register_role_medecin')}</option>
            <option value="admin">{t('register_role_admin')}</option>
          </select>

          {formData.role === 'medecin' && (
            <>
              <label className="required">{t('register_specialite')}</label>
              <input type="text" name="specialite" value={formData.specialite} onChange={handleChange} required />

              <label className="required">{t('register_telephone')}</label>
              <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />

              <label className="required">{t('register_disponibilites')}</label>
              <textarea name="disponibilites" value={formData.disponibilites} onChange={handleChange} rows="3" required />
              <small>{t('register_disponibilites_format')}</small>
            </>
          )}

          {formData.role === 'admin' && (
            <>
              <label className="required">{t('register_code_admin')}</label>
              <input
                type="text"
                name="code_securite"
                value={formData.code_securite}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">{t('register_button')}</button>
        </form>

        {success && <p className="success">{t('register_success')}</p>}
        {error && <p className="error">{error}</p>}

        <p>
          {t('register_already_account')}{' '}
          <Link to="/connexion">{t('register_login_link')}</Link>
        </p>
      </div>
        <ChatBotWidget />
    </div>
  );
}
