
import React, { useState } from 'react';
import { mockTeam } from '../data/mockData';
import { TeamMember } from '../types';

interface LoginProps {
  onLogin: (user: TeamMember) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedUserId, setSelectedUserId] = useState(mockTeam[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockTeam.find(u => u.id === selectedUserId);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary">Agency OS</h1>
        <p className="mt-2 text-center text-gray-600">The unified platform for modern agencies</p>
      </div>
      <div className="max-w-md w-full mx-auto mt-8 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
           <div>
            <label htmlFor="user-select" className="text-sm font-medium text-gray-700 block mb-2">
              Select a user profile to sign in
            </label>
            <select
              id="user-select"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
            >
              {mockTeam.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;