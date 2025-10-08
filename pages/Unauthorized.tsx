import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <Link to="/dashboard" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
