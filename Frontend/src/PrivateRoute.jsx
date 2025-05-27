import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Exemplo: verifica se há token

  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
