import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Omit<Project, 'id' | 'tasks' | 'team'>) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAddProject }) => {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    if (!isOpen) {
        setName('');
        setClient('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setBudget(0);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject({ name, client, description, startDate, endDate, budget });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Add New Project</h2>
          </div>
          <div className="px-6 py-4 space-y-4 border-t border-b">
            <div>
              <label htmlFor="proj-name" className="block text-sm font-medium text-gray-700">Project Name</label>
              <input type="text" id="proj-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
              <label htmlFor="proj-client" className="block text-sm font-medium text-gray-700">Client</label>
              <input type="text" id="proj-client" value={client} onChange={e => setClient(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
              <label htmlFor="proj-desc" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="proj-desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="proj-start" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" id="proj-start" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
              </div>
              <div>
                <label htmlFor="proj-end" className="block text-sm font-medium text-gray-700">End Date</label>
                <input type="date" id="proj-end" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
              </div>
            </div>
             <div>
                <label htmlFor="proj-budget" className="block text-sm font-medium text-gray-700">Budget ($)</label>
                <input type="number" id="proj-budget" value={budget} onChange={e => setBudget(Number(e.target.value))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
              </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Add Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
