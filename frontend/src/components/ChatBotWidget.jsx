import React, { useState } from 'react';
import './ChatBotWidget.css';
import { useTranslation } from 'react-i18next';

export default function ChatBotWidget() {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false); // État pour ouvrir/fermer le chat
  const [isMinimized, setIsMinimized] = useState(false); // État pour minimiser

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

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir le chat */}
      {!isOpen && (
        <div className="chat-floating-button" onClick={toggleChat}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22V4C22 2.9 21.1 2 20 2ZM20 18L18.17 16.17C18.06 16.06 17.92 16 17.76 16H4V4H20V18Z" fill="white"/>
            <circle cx="8" cy="10" r="1" fill="white"/>
            <circle cx="12" cy="10" r="1" fill="white"/>
            <circle cx="16" cy="10" r="1" fill="white"/>
          </svg>
          <span className="chat-notification-badge">IA</span>
        </div>
      )}

      {/* Widget de chat */}
      {isOpen && (
        <div className={`chat-widget ${isMinimized ? 'minimized' : ''}`}>
          {/* En-tête du chat */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H21V9ZM3 19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V11H3V19Z" fill="white"/>
                </svg>
              </div>
              <div>
                <h4>{t('chat.titre') || 'Assistant IA'}</h4>
                <span className="chat-status">En ligne</span>
              </div>
            </div>
            <div className="chat-controls">
              <button className="chat-control-btn" onClick={minimizeChat}>
                {isMinimized ? '□' : '−'}
              </button>
              <button className="chat-control-btn" onClick={closeChat}>
                ×
              </button>
            </div>
          </div>

          {/* Corps du chat - masqué si minimisé */}
          {!isMinimized && (
            <>
              <div className="chat-body">
                {conversation.length === 0 && (
                  <div className="chat-welcome">
                    <p>👋 {t('chatbienvenue') }</p>
                  </div>
                )}
                
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${msg.from === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    <div className="message-content">
                      {msg.text}
                    </div>
                    <div className="message-time">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="chat-message bot-message">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Formulaire de saisie */}
              <div className="chat-footer">
                {error && <div className="chat-error">{error}</div>}
                <form onSubmit={handleSend} className="chat-input-form">
                  <div className="chat-input-container">
                    <input
                      type="text"
                      placeholder={t('chat.placeholder') || 'Tapez votre message...'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={loading}
                      className="chat-input"
                    />
                    <button 
                      type="submit" 
                      disabled={loading || !message.trim()}
                      className="chat-send-btn"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}