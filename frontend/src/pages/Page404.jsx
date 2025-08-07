// src/pages/Page404.jsx
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Oups ! La page que vous cherchez est introuvable.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  );
}
