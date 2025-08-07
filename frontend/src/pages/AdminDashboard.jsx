// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [medecins, setMedecins] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/medecins")
      .then(res => setMedecins(res.data))
      .catch(err => console.error("Erreur :", err));
  }, []);

  const supprimerMedecin = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/medecins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMedecins(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Liste des médecins</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medecins.map((med) => (
            <tr key={med._id}>
              <td>{med.nom}</td>
              <td>{med.specialite}</td>
              <td>{med.email}</td>
              <td>{med.telephone}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => supprimerMedecin(med._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
