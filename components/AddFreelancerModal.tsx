import React, { useState, useEffect } from 'react';
import { Freelancer } from '../types';

interface AddFreelancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (freelancer: Omit<Freelancer, 'id'>) => void;
}

const AddFreelancerModal: React.FC<AddFreelancerModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [commissionRate, setCommissionRate] = useState(10);
  
  const resetForm = () => {
    setName('');
    setEmail('');
    setSpecialty('');
    setCommissionRate(10);
  };

  useEffect(() => {
    if (!isOpen) {
        resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, email, specialty, commissionRate });
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
            <h2 className="text-xl font-bold text-gray-900">Add New Freelancer</h2>
          </div>
          <div className="px-6 py-4 space-y-4 border-t border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="fl-name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="fl-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
                </div>
                 <div>
                    <label htmlFor="fl-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="fl-email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
                </div>
            </div>
             <div>
                <label htmlFor="fl-specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                <input type="text" id="fl-specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} placeholder="e.g., Web Development, SEO" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
             <div>
                <label htmlFor="fl-commission" className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                <input 
                    type="number" 
                    id="fl-commission" 
                    value={commissionRate} 
                    onChange={e => setCommissionRate(Number(e.target.value))} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" 
                    min="8"
                    max="15"
                    required 
                />
                <p className="text-xs text-gray-500 mt-1">Rate must be between 8% and 15%.</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Add Freelancer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFreelancerModal;