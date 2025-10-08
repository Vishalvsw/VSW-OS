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
import { AuthProvider } from './contexts/AuthContext';
import Authorization from './components/Authorization';
import type { TeamMember, Role } from './types';
import Unauthorized from './pages/Unauthorized';

const ROUTE_ROLES: Record<string, Role[]> = {
    dashboard: ['Administrator', 'Project Manager', 'Team Member', 'Client'],
    projects: ['Administrator', 'Project Manager', 'Team Member', 'Client'],
    clients: ['Administrator', 'Project Manager'],
    crm: ['Administrator', 'Project Manager'],
    marketing: ['Administrator'],
    team: ['Administrator', 'Project Manager'],
    invoices: ['Administrator', 'Client'],
    'chatbot-builder': ['Administrator'],
    settings: ['Administrator'],
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
                <Route path="dashboard" element={<Authorization allowedRoles={ROUTE_ROLES.dashboard}><Dashboard /></Authorization>} />
                <Route path="projects" element={<Authorization allowedRoles={ROUTE_ROLES.projects}><Projects /></Authorization>} />
                <Route path="projects/:projectId" element={<Authorization allowedRoles={ROUTE_ROLES.projects}><ProjectDetail /></Authorization>} />
                <Route path="clients" element={<Authorization allowedRoles={ROUTE_ROLES.clients}><Clients /></Authorization>} />
                <Route path="crm" element={<Authorization allowedRoles={ROUTE_ROLES.crm}><CRM /></Authorization>} />
                <Route path="marketing" element={<Authorization allowedRoles={ROUTE_ROLES.marketing}><Marketing /></Authorization>} />
                <Route path="team" element={<Authorization allowedRoles={ROUTE_ROLES.team}><Team /></Authorization>} />
                <Route path="invoices" element={<Authorization allowedRoles={ROUTE_ROLES.invoices}><Invoices /></Authorization>} />
                <Route path="chatbot-builder" element={<Authorization allowedRoles={ROUTE_ROLES['chatbot-builder']}><ChatbotBuilder /></Authorization>} />
                <Route path="settings" element={<Authorization allowedRoles={ROUTE_ROLES.settings}><Settings /></Authorization>} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
