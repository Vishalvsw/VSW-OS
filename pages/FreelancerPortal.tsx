import React, { useState } from 'react';
import type { CommissionDeal, Freelancer } from '../types';
import { mockCommissionDeals, mockFreelancers } from '../data/mockData';
import { usePermissions } from '../hooks/usePermissions';
import AddFreelancerModal from '../components/AddFreelancerModal';
import CommissionCalculator from '../components/CommissionCalculator';

const commissionStatusColors = {
  'Paid': 'bg-green-100 text-green-800',
  'Pending Payment': 'bg-yellow-100 text-yellow-800',
};

const FreelancerPortal: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>(mockFreelancers);
  const [commissionDeals, setCommissionDeals] = useState<CommissionDeal[]>(mockCommissionDeals);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { can } = usePermissions();

  const handleAddFreelancer = (newFreelancer: Omit<Freelancer, 'id'>) => {
    const freelancerToAdd: Freelancer = {
      ...newFreelancer,
      id: `freelancer-${Date.now()}`,
    };
    setFreelancers(prev => [freelancerToAdd, ...prev]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Freelancer Portal</h1>
        {can('freelancer:create') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700"
          >
            Add Freelancer
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Commission Deals</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Freelancer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Client</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Project</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Commission</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {commissionDeals.map(deal => (
                <tr key={deal.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{deal.freelancer.name}</td>
                  <td className="py-3 px-4 text-gray-700">{deal.client.name} ({deal.client.company})</td>
                  <td className="py-3 px-4 text-gray-700">{deal.projectName}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">
                    ${deal.commissionAmount.toLocaleString()}
                    <span className="text-xs text-gray-500 font-normal ml-1">({deal.commissionRate}%)</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${commissionStatusColors[deal.status]}`}>
                      {deal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <CommissionCalculator />
      </div>

      <AddFreelancerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddFreelancer}
      />
    </div>
  );
};

export default FreelancerPortal;
