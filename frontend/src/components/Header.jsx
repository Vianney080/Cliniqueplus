import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const getInitialTheme = () => localStorage.getItem('theme') || 'system';
  const [theme, setTheme] = useState(getInitialTheme());
  const [langue, setLangue] = useState(localStorage.getItem('langue') || 'fr');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const userInitial = username ? username.charAt(0).toUpperCase() : '';

  useEffect(() => {
    const currentTheme = theme === 'system' ? getSystemTheme() : theme;
    //document.body.className = currentTheme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
    if (currentTheme === 'dark') {
      document.body.classList.add('bg-dark', 'text-light', 'dark');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-light', 'dark');
    }

  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(langue);
    localStorage.setItem('langue', langue);
  }, [langue, i18n]);

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    setUsername(storedName || '');
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/connexion';
  };

  return (
    <header>
      <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm fixed-top`}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/flags/logo.jpeg" alt="Clinique +" width="50" className="me-2" />
            <div className="d-none d-md-block">
              <h5 className="mb-0 fw-bold">CLINIQUE +</h5>
            </div>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <Link className="nav-link" to="/">{t("accueil")}</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#services" id="servicesDropdown" role="button" data-bs-toggle="dropdown">
                  {t("services")}
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/laboratoire">{t("laboratoire")}</a></li>
                  <li><a className="dropdown-item" href="/urgences">{t("urgences")}</a></li>
                  <li><a className="dropdown-item" href="/radiologie">{t("radiologie")}</a></li>
                  <li><a className="dropdown-item" href="/pharmacie">{t("pharmacie")}</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#specialites" id="specialitesDropdown" role="button" data-bs-toggle="dropdown">
                  {t("specialites")}
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/pneumologie">{t("pneumologie")}</a></li>
                  <li><a className="dropdown-item" href="/cardiologie">{t("cardiologie")}</a></li>
                  <li><a className="dropdown-item" href="/pediatrie">{t("pediatrie")}</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">{t("contact")}</a>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-primary btn-sm" to="/rendezvous">{t("rendezvous")}</Link>
              </li>

              {username ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle d-flex align-items-center" id="userDropdown" role="button" data-bs-toggle="dropdown">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: '30px', height: '30px' }}>
                      {userInitial}
                    </div>
                    <span className="fw-bold">{username}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={() => {
                        const role = localStorage.getItem('role');
                        if (role === 'medecin') {
                          window.location.href = '/dashboard-medecin';
                        } else if (role === 'patient') {
                          window.location.href = '/dashboard-patient';
                        }
                        else if (role === 'admin') {
                          window.location.href = '/dashboard-admin';
                        } else {
                          window.location.href = '/connexion';
                        }
                      }}>
                        🏥 {t("mon_espace")}
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>🔓 {t("se_deconnecter")}</button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="btn btn-outline-success btn-sm" to="/connexion">{t("connexion")}</Link>
                </li>
              )}

              <li className="nav-item d-flex align-items-center">
                <div className="d-flex align-items-center me-1">
                  <img src="/flags/ca.png" alt="Français" width="24" height="18" onClick={() => setLangue('fr')} style={{ cursor: 'pointer', marginRight: '5px' }} />
                  <p className="mb-0">Ca</p>
                </div>
                <div className="d-flex align-items-center">
                  <img src="/flags/en.png" alt="English" width="24" height="18" onClick={() => setLangue('en')} style={{ cursor: 'pointer', marginRight: '5px' }} />
                  <p className="mb-0">En</p>
                </div>
              </li>
              <li className="nav-item">
                <select className="form-select form-select-sm" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="light">☀️ {t('themeclair')}</option>
                  <option value="dark">🌙 {t('themesombre')}</option>
                  <option value="system">🖥️ {t('themesysteme')}</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
