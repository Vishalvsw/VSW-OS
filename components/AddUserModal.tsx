import React, { useState, useEffect } from 'react';
import { TeamMember, Role } from '../types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<TeamMember, 'id'>) => void;
}

const ROLES: Role[] = ['Administrator', 'Project Manager', 'Team Member', 'Client'];

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [role, setRole] = useState<Role>('Team Member');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (!isOpen) {
        setName('');
        setTitle('');
        setRole('Team Member');
        setAvatar('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;
    onSave({ name, title, role, avatar });
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
            <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
          </div>
          <div className="px-6 py-4 space-y-4 border-t border-b">
            <div>
              <label htmlFor="user-name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="user-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
              <label htmlFor="user-title" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" id="user-title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
             <div>
              <label htmlFor="user-avatar" className="block text-sm font-medium text-gray-700">Avatar URL (Optional)</label>
              <input type="text" id="user-avatar" value={avatar} onChange={e => setAvatar(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="https://..." />
            </div>
            <div>
              <label htmlFor="role-select-add" className="block text-sm font-medium text-gray-700">System Role</label>
              <select 
                id="role-select-add" 
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
            <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;