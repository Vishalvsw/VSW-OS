import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Role } from '../types';
import Unauthorized from '../pages/Unauthorized';

interface AuthorizationProps {
  allowedRoles: Role[];
  children: React.ReactElement;
}

const Authorization: React.FC<AuthorizationProps> = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(currentUser.role)) {
    return children;
  }
  
  return <Unauthorized />;
};

export default Authorization;
