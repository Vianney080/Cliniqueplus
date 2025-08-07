// src/contexte/AuthContexte.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/axios";


const AuthContexte = createContext();
export const useAuth = () => useContext(AuthContexte);

/**
 * Fournit : { utilisateur, connexion, deconnexion }
 * - utilisateur : null ou { _id, name, role, … }
 * - connexion({ token, user })  → stocke token + user puis setUser
 * - deconnexion()              → vide le stockage et remet user à null
 */
export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(() => {
    const brut = localStorage.getItem("utilisateur");
    return brut ? JSON.parse(brut) : null;
  });

  /* Ajoute automatiquement le token JWT dans chaque requête sortante */
  useEffect(() => {
    const id = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => axios.interceptors.request.eject(id);
  }, []);

  const connexion = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("utilisateur", JSON.stringify(user));
    setUtilisateur(user);
  };

  const deconnexion = () => {
    localStorage.clear();
    setUtilisateur(null);
  };

  return (
    <AuthContexte.Provider value={{ utilisateur, connexion, deconnexion }}>
      {children}
    </AuthContexte.Provider>
  );
}
