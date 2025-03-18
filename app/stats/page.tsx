'use client';

import { useEffect, useState } from 'react';
import VisitorCounter from '../components/VisitorCounter';

export default function StatsPage() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Get visitor count from localStorage
    const count = localStorage.getItem('visitorCount');
    if (count) {
      setVisitorCount(parseInt(count));
    } else {
      // Initialize count if not exists
      localStorage.setItem('visitorCount', '1');
      setVisitorCount(1);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Website Statistics
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Track visitor analytics and usage statistics
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Total Visitors
            </h2>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {visitorCount}
            </p>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Analytics Dashboard
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Detailed analytics are available in your Vercel dashboard.
            </p>
          </div>
        </div>
      </div>
      <VisitorCounter />
    </div>
  );
} 