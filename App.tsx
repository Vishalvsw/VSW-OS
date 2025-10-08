import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CRM from './pages/CRM';
import Invoices from './pages/Invoices';
import Settings from './pages/Settings';
import ChatbotBuilder from './pages/ChatbotBuilder';
import Clients from './pages/Clients';
import Marketing from './pages/Marketing';
import Team from './pages/Team';
import FreelancerPortal from './pages/FreelancerPortal';
import { AuthProvider } from './contexts/AuthContext';
import Authorization from './components/Authorization';
import type { TeamMember, Role } from './types';
import Unauthorized from './pages/Unauthorized';
import { ROLES_CONFIG } from './config/roles';




import { BrowserRouter as Router } from 'react-router-dom';

<Router basename="/"> 


// This helper function creates a single source of truth for route access
// by reading from the centralized roles configuration.



const getBasename = (): string => {
  const match = window.location.pathname.match(/^(\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  return match ? match[1] : '/';
};


  
const getRolesForRoute = (path: string): Role[] => {
    const rolesWithAccess: Role[] = [];
    for (const role in ROLES_CONFIG) {
        if (ROLES_CONFIG[role as Role].routes.includes(path)) {
            rolesWithAccess.push(role as Role);
        }
    }
    return rolesWithAccess;
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);

  const handleLogin = (user: TeamMember) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <AuthProvider user={currentUser} onLogout={handleLogout}>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Authorization allowedRoles={getRolesForRoute('/dashboard')}><Dashboard /></Authorization>} />
                <Route path="projects" element={<Authorization allowedRoles={getRolesForRoute('/projects')}><Projects /></Authorization>} />
                <Route path="projects/:projectId" element={<Authorization allowedRoles={getRolesForRoute('/projects')}><ProjectDetail /></Authorization>} />
                <Route path="clients" element={<Authorization allowedRoles={getRolesForRoute('/clients')}><Clients /></Authorization>} />
                <Route path="crm" element={<Authorization allowedRoles={getRolesForRoute('/crm')}><CRM /></Authorization>} />
                <Route path="marketing" element={<Authorization allowedRoles={getRolesForRoute('/marketing')}><Marketing /></Authorization>} />
                <Route path="team" element={<Authorization allowedRoles={getRolesForRoute('/team')}><Team /></Authorization>} />
                <Route path="invoices" element={<Authorization allowedRoles={getRolesForRoute('/invoices')}><Invoices /></Authorization>} />
                <Route path="chatbot-builder" element={<Authorization allowedRoles={getRolesForRoute('/chatbot-builder')}><ChatbotBuilder /></Authorization>} />
                <Route path="freelancer-portal" element={<Authorization allowedRoles={getRolesForRoute('/freelancer-portal')}><FreelancerPortal /></Authorization>} />
                <Route path="settings" element={<Authorization allowedRoles={getRolesForRoute('/settings')}><Settings /></Authorization>} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
