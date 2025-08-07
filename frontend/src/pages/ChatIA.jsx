import React, { useState } from 'react';
import './ChatIA.css';
import { useTranslation } from 'react-i18next';

export default function ChatIA() {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]); // historique
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { from: 'user', text: message };
    setConversation((prev) => [...prev, userMsg]);
    setMessage('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/ia/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: message,
          langue: i18n.language
        })
      });

      const data = await res.json();
      if (res.ok) {
        const botMsg = { from: 'bot', text: data.response };
        setConversation((prev) => [...prev, botMsg]);
      } else {
        setError(data.error || t('chat.erreur'));
      }
    } catch (err) {
      setError(t('chat.erreur'));
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h2>{t('chat.titre')}</h2>

      <div className="chat-box">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={msg.from === 'user' ? 'chat-bulle user' : 'chat-bulle bot'}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="chat-bulle bot">{t('chat.chargement')}...</div>
        )}
      </div>

      <form onSubmit={handleSend} className="chat-form">
        <input
          type="text"
          placeholder={t('chat.placeholder')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {t('chat.envoyer')}
        </button>
      </form>

      {error && <p className="chat-error">{error}</p>}
    </div>
  );
}
