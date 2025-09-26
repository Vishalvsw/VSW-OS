
import React from 'react';
import type { Lead } from '../types';
import ProposalGenerator from '../components/ProposalGenerator';

const mockLeads: Lead[] = [
  { id: '1', name: 'John Doe', company: 'Innovate LLC', email: 'john@innovate.co', status: 'Qualified', value: 50000 },
  { id: '2', name: 'Jane Smith', company: 'Solutions Inc.', email: 'jane@solutions.com', status: 'Contacted', value: 25000 },
  { id: '3', name: 'Peter Jones', company: 'Tech Forward', email: 'peter@techforward.io', status: 'New', value: 75000 },
];

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-green-100 text-green-800',
  'Lost': 'bg-red-100 text-red-800',
};

const CRM: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Leads</h2>
          <button className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700">
            New Lead
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Company</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Value</th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map(lead => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{lead.name}</td>
                  <td className="py-3 px-4 text-gray-700">{lead.company}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">${lead.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProposalGenerator />
    </div>
  );
};

export default CRM;
