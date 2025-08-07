import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Clinique+ — Tous droits réservés.</p>
        <p className="mb-0">
          Fait par l’équipe Vian_Dev <br />
          <small>Plateforme de prise de rendez-vous médicaux en ligne</small>
        </p>
      </div>
    </footer>
  );
}
