import React, { createContext, useContext } from 'react';
import type { TeamMember } from '../types';

interface AuthContextType {
  currentUser: TeamMember | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, logout: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ user: TeamMember | null; onLogout: () => void; children: React.ReactNode }> = ({ user, onLogout, children }) => {
  return (
    <AuthContext.Provider value={{ currentUser: user, logout: onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
