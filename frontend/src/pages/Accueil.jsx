import React from 'react';
import './Accueil.css';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ChatBotWidget from '../components/ChatBotWidget'; // Nouveau composant

import laboratoireImg from '../assets/laboratoire.jpg';
import urgenceImg from '../assets/urgence.jpg';
import radiologieImg from '../assets/radiologie.jpg';
import pharmacieImg from '../assets/pharmacie.jpg';
import chirurgienImg from '../assets/chiru.jpg';
import chambreImg from '../assets/chambre.jpg';

export default function Accueil() {
  const { t } = useTranslation();

  const slides = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1664475465626-d3a01c077181?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGJpZW52ZW51ZSUyMGhvcGl0YWx8ZW58MHx8MHx8fDA%3D',
      title: t('banniere1_titre'),
      subtitle: t('banniere1_sous_titre'),
    },
    {
      image: 'https://images.unsplash.com/photo-1722586663955-2f96a4c1f255?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('banniere2_titre'),
      subtitle: t('banniere2_sous_titre'),
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXF1aXBlJTIwZGUlMjBtZWRlY2luc3xlbnwwfHwwfHx8MA%3D%3D',
      title: t('banniere3_titre'),
      subtitle: t('banniere3_sous_titre'),
    },
  ];

  return (
    <div className="accueil-page">
      <Carousel fade interval={5000} pause={false} className="carousel-banner">
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <div className="banner-slide" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="caption-wrapper">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <a href="/rendezvous" className="btn btn-primary mt-3">
                  {t('btn_rdv')}
                </a>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <section className="a-propos-section">
        <div className="container">
          <h2 className="text-primary fw-bold mb-4">{t('a_propos_titre')}</h2>
          <div className="row align-items-center">
            <div className="col-md-6 a-propos-text">
              <p>{t('a_propos_texte1')}</p>
              <p>{t('a_propos_texte2')}</p>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-6 mb-3">
                  <img src={chirurgienImg} alt="Chirurgien" className="img-fluid rounded shadow" />
                </div>
                <div className="col-6 mb-3">
                  <img src={chambreImg} alt="Chambre" className="img-fluid rounded shadow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-theme py-5">
        <div className="container">
          <h2 className="text-primary text-center fw-bold mb-5">{t('nos_services')}</h2>
          <div className="row">
            {[
              { title: t('laboratoire'), img: laboratoireImg },
              { title: t('urgences'), img: urgenceImg },
              { title: t('radiologie'), img: radiologieImg },
              { title: t('pharmacie'), img: pharmacieImg },
            ].map((service, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm service-card text-center">
                  <img src={service.img} className="card-img-top" alt={service.title} />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="temoignages-section section-theme">
        <div className="container">
          <h2 className="text-primary fw-bold mb-5 text-center">{t('temoignages')}</h2>
          <Carousel indicators={false} controls={true} interval={6000} pause={false}>
            {[
              {
                name: t('temoin1_nom'),
                role: t('temoin1_role'),
                text: t('temoin1_texte')
              },
              {
                name: t('temoin2_nom'),
                role: t('temoin2_role'),
                text: t('temoin2_texte')
              },
              {
                name: t('temoin3_nom'),
                role: t('temoin3_role'),
                text: t('temoin3_texte')
              }
            ].map((tmo, i) => (
              <Carousel.Item key={i}>
                <div className="temoignage-card mx-auto text-center p-4">
                  <p className="temoignage-text mb-4">"{tmo.text}"</p>
                  <h5 className="fw-bold">{tmo.name}</h5>
                  <small className="text-muted">{tmo.role}</small>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="actualites-section section-theme py-5">
        <div className="container">
          <h2 className="text-primary text-center fw-bold mb-5">{t('actualites')}</h2>
          <div className="row">
            {[
              {
                titre: t('actu1_titre'),
                contenu: t('actu1_texte'),
                image: '/images/actus1.jpg'
              },
              {
                titre: t('actu2_titre'),
                contenu: t('actu2_texte'),
                image: '/images/actus2.jpg'
              },
              {
                titre: t('actu3_titre'),
                contenu: t('actu3_texte'),
                image: '/images/actus3.jpg'
              }
            ].map((actu, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm actu-card">
                  <img src={actu.image} className="card-img-top" alt={actu.titre} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{actu.titre}</h5>
                    <p className="card-text flex-grow-1">{actu.contenu}</p>
                    <Link to={`/actualites/${i + 1}`} className="btn btn-outline-primary mt-3 align-self-start">
                      Lire plus
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widget ChatBot flottant - toujours visible */}
      <ChatBotWidget />
      
    </div>
  );
}