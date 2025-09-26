
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, change, changeType, icon }) => {
  const isIncrease = changeType === 'increase';
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`mt-1 text-xs ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-semibold">{change}</span> vs last month
            </p>
          )}
        </div>
        <div className="bg-primary-100 text-primary p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
