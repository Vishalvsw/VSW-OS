import React, { useState, useEffect } from 'react';
import { TeamMember, Role } from '../types';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: TeamMember;
  onSave: (user: TeamMember) => void;
}

const ROLES: Role[] = ['Administrator', 'Project Manager', 'Team Member', 'Client'];

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [role, setRole] = useState<Role>(user.role);

  useEffect(() => {
    setRole(user.role);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, role });
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Edit Role for {user.name}</h2>
          </div>
          <div className="px-6 py-4 space-y-4 border-t border-b">
            <div>
              <label htmlFor="role-select" className="block text-sm font-medium text-gray-700">System Role</label>
              <select 
                id="role-select" 
                value={role} 
                onChange={e => setRole(e.target.value as Role)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              >
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
