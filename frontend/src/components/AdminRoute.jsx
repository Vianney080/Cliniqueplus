import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // 🔐 Si pas connecté ou pas admin, rediriger
  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/connexion" />;
  }

  return children;
}
