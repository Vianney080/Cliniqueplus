import React, { useRef, useState } from 'react';
import './Contact.css';
import { useTranslation } from 'react-i18next';
import contactImage from '../assets/contact.jpg';
import ChatBotWidget from '../components/ChatBotWidget'; 

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef();
  const [success, setSuccess] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const form = formRef.current;

    const params = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    // Vérification rapide : l'email est-il valide ?
    if (!params.email || !/\S+@\S+\.\S+/.test(params.email)) {
      setSuccess(false);
      alert("❌ Adresse e-mail invalide.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setIsDisabled(true);
        form.reset(); // Réinitialise les champs
      } else {
        setSuccess(false);
      }

    } catch (error) {
      console.error('Erreur côté client :', error);
      setSuccess(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="cover-image">
        <img src={contactImage} alt="Contact" />
        <div className="overlay-text">
          <h1>{t('contact')}</h1>
          <p>{t('contact_intro')}</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>📞 {t('contact_phone')}</h3>
          <p>+1 (514) 123-4567</p>
          <h3>📧 {t('contact_email')}</h3>
          <p>contact@cliniqueplus.ca</p>
          <h3>📍 {t('contact_address')}</h3>
          <p>123 Rue de la Santé, Montréal, QC</p>
        </div>

        <div className="contact-form">
          <h2>{t('contact_form_title')}</h2>
          <form ref={formRef} onSubmit={sendEmail}>
            <input type="text" name="name" placeholder={t('contact_name')} required />
            <input type="email" name="email" placeholder={t('contact_email')} required />
            <input type="tel" name="phone" placeholder={t('contact_phone')} required />

            <textarea name="message" placeholder={t('contact_message')} rows="5" required></textarea>
            <button type="submit" disabled={isDisabled}>
              {isDisabled ? t('contact_sent') : t('contact_send')}
            </button>
          </form>

          {success === true && (
            <div className="success-message">
              <span>✅</span> {t('contact_success')}
            </div>
          )}

          {success === false && (
            <div className="error-message">
              <span>❌</span> {t('contact_error')}
            </div>
          )}
        </div>
      </div>
        <ChatBotWidget />
    </div>
  );
}
