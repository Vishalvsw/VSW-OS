import React from 'react';
import { mockScheduledPosts } from '../data/mockData';
import MarketingCalendar from '../components/MarketingCalendar';

const Marketing: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Marketing Calendar</h1>
            <p className="mt-1 text-gray-600">Your weekly social media schedule at a glance.</p>
        </div>
        <button
            className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700"
          >
            Schedule Post
          </button>
      </div>
      <MarketingCalendar posts={mockScheduledPosts} />
    </div>
  );
};

export default Marketing;