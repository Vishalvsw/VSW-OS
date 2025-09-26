
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from '../components/DashboardCard';
import { ProjectIcon } from '../components/icons/ProjectIcon';
import { InvoiceIcon } from '../components/icons/InvoiceIcon';
import { CrmIcon } from '../components/icons/CrmIcon';

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Revenue" 
          value="$45,231.89" 
          change="+20.1%" 
          changeType="increase" 
          icon={<InvoiceIcon className="h-6 w-6" />} 
        />
        <DashboardCard 
          title="New Leads" 
          value="+2,350" 
          change="+180.1%" 
          changeType="increase" 
          icon={<CrmIcon className="h-6 w-6" />}
        />
        <DashboardCard 
          title="Active Projects" 
          value="12" 
          change="-2" 
          changeType="decrease" 
          icon={<ProjectIcon className="h-6 w-6" />}
        />
        <DashboardCard 
          title="Team Utilization" 
          value="82%" 
          change="+5%" 
          changeType="increase" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
