
import React from 'react';
import type { Invoice } from '../types';
import { usePermissions } from '../hooks/usePermissions';

const mockInvoices: Invoice[] = [
  { id: 'INV-001', project: 'HRMS Build', amount: 15000, status: 'Paid', dueDate: '2023-07-30' },
  { id: 'INV-002', project: 'Q3 Marketing Campaign', amount: 7500, status: 'Sent', dueDate: '2023-08-15' },
  { id: 'INV-003', project: 'AI Chatbot Integration', amount: 12000, status: 'Overdue', dueDate: '2023-06-30' },
  { id: 'INV-004', project: 'HRMS Build', amount: 15000, status: 'Draft', dueDate: '2023-08-30' },
];

const statusColors = {
  'Paid': 'bg-green-100 text-green-800',
  'Sent': 'bg-blue-100 text-blue-800',
  'Overdue': 'bg-red-100 text-red-800',
  'Draft': 'bg-gray-100 text-gray-800',
};

const Invoices: React.FC = () => {
  const { can } = usePermissions();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Invoices</h2>
        {can('invoice:create') && (
          <button className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700">
            New Invoice
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Invoice ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Project</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map(invoice => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-primary">{invoice.id}</td>
                <td className="py-3 px-4 text-gray-700">{invoice.project}</td>
                <td className="py-3 px-4 text-gray-700">${invoice.amount.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[invoice.status]}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;