'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Get visitor count from localStorage
    const count = localStorage.getItem('visitorCount');
    if (count) {
      setVisitorCount(parseInt(count));
    } else {
      // If no count exists, initialize it
      localStorage.setItem('visitorCount', '1');
      setVisitorCount(1);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg text-sm">
      <div className="text-gray-600 dark:text-gray-300">
        Visitors: {visitorCount}
      </div>
    </div>
  );
} 