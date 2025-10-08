import React, { useState } from 'react';
import { mockTeam as initialMockTeam } from '../data/mockData';
import type { TeamMember } from '../types';
import { useAuth } from '../contexts/AuthContext';
import EditUserModal from '../components/EditUserModal';
import AddUserModal from '../components/AddUserModal';

const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(initialMockTeam);
  const [editingUser, setEditingUser] = useState<TeamMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleUpdateUser = (updatedUser: TeamMember) => {
    setTeam(team.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
  };

  const handleAddUser = (newUser: Omit<TeamMember, 'id'>) => {
    const userToAdd: TeamMember = {
      ...newUser,
      id: `user-${Date.now()}`,
      avatar: newUser.avatar || `https://picsum.photos/seed/user-${Date.now()}/100`
    };
    setTeam(prevTeam => [userToAdd, ...prevTeam]);
    setIsAddModalOpen(false);
  };

  const isAdmin = currentUser?.role === 'Administrator';

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
            {isAdmin && (
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700"
                >
                    New User
                </button>
            )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Member</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">System Role</th>
                {isAdmin && <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {team.map(member => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={member.avatar} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                          <p className="font-medium text-gray-800">{member.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{member.title}</td>
                  <td className="py-3 px-4 text-gray-700">{member.role}</td>
                  {isAdmin && (
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => setEditingUser(member)}
                        className="text-primary hover:text-primary-700 font-medium"
                      >
                        Edit Role
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingUser && (
        <EditUserModal 
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          user={editingUser}
          onSave={handleUpdateUser}
        />
      )}
       <AddUserModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddUser}
       />
    </>
  );
};

export default Team;