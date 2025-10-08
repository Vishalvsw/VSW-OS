import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROLES_CONFIG } from '../config/roles';
import { DashboardIcon } from './icons/DashboardIcon';
import { ProjectIcon } from './icons/ProjectIcon';
import { CrmIcon } from './icons/CrmIcon';
import { InvoiceIcon } from './icons/InvoiceIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { ChatbotIcon } from './icons/ChatbotIcon';
import { ClientIcon } from './icons/ClientIcon';
import { MarketingIcon } from './icons/MarketingIcon';
import { TeamIcon } from './icons/TeamIcon';
import { FreelancerIcon } from './icons/FreelancerIcon';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { name: 'Projects', href: '/projects', icon: ProjectIcon },
  { name: 'Clients', href: '/clients', icon: ClientIcon },
  { name: 'CRM', href: '/crm', icon: CrmIcon },
  { name: 'Marketing', href: '/marketing', icon: MarketingIcon },
  { name: 'Team', href: '/team', icon: TeamIcon },
  { name: 'Finance', href: '/invoices', icon: InvoiceIcon },
  { name: 'Chatbot Builder', href: '/chatbot-builder', icon: ChatbotIcon },
  { name: 'Freelancer Portal', href: '/freelancer-portal', icon: FreelancerIcon },
];

const Sidebar: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const accessibleRoutes = ROLES_CONFIG[currentUser.role].routes;
  const filteredNavigation = navigation.filter(item => accessibleRoutes.includes(item.href));
  const canSeeSettings = accessibleRoutes.includes('/settings');

  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
        Agency OS
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      {canSeeSettings && (
        <div className="px-2 py-4 space-y-1 border-t border-gray-700">
          <NavLink
              to="/settings"
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <SettingsIcon className="mr-3 h-6 w-6 flex-shrink-0" />
              Settings
            </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;