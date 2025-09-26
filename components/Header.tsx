
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1] || 'dashboard';
    
    const pageTitles: { [key: string]: string } = {
        'dashboard': 'Dashboard',
        'projects': 'Projects',
        'clients': 'Clients',
        'crm': 'CRM',
        'marketing': 'Marketing',
        'team': 'Team',
        'invoices': 'Finance',
        'chatbot-builder': 'Chatbot Builder',
        'settings': 'Settings'
    };

    return pageTitles[path] || 'Dashboard';
  };
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center justify-between h-full px-6">
        <h2 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                className="h-9 w-9 rounded-full object-cover"
                src="https://picsum.photos/100"
                alt="User avatar"
              />
              <span className="hidden md:inline text-sm font-medium text-gray-700">Tenant Admin</span>
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <a href="#/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <button 
                  onClick={onLogout} 
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;