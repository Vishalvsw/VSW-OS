import React from 'react';
import type { ColdLead, ColdLeadStatus } from '../types';

interface LeadTableProps {
  leads: ColdLead[];
  onUpdateLeadStatus: (leadId: string, newStatus: ColdLeadStatus) => void;
}

const statusOptions: ColdLeadStatus[] = ['New', 'Contacted', 'Interested', 'Not Interested'];

const statusColors: Record<ColdLeadStatus, string> = {
  'New': 'bg-blue-100 text-blue-800 border-blue-200',
  'Contacted': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Interested': 'bg-green-100 text-green-800 border-green-200',
  'Not Interested': 'bg-red-100 text-red-800 border-red-200',
};

const LeadTable: React.FC<LeadTableProps> = ({ leads, onUpdateLeadStatus }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Company</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Contact</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-800">{lead.name}</td>
              <td className="py-3 px-4 text-gray-700">{lead.company}</td>
              <td className="py-3 px-4 text-gray-700">
                <div className="flex flex-col">
                  <a href={`mailto:${lead.email}`} className="text-primary hover:underline text-sm">{lead.email}</a>
                  <span className="text-xs text-gray-500">{lead.phone}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <select 
                  value={lead.status}
                  onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as ColdLeadStatus)}
                  className={`border rounded-md px-2 py-1 text-xs font-semibold focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:outline-none transition ${statusColors[lead.status]}`}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status} className="bg-white text-gray-800">{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                    No leads found.
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
