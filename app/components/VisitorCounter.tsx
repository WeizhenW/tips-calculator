'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    // Get visitor's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding to get location name
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              setLocation(data.display_name.split(',')[0]);
            })
            .catch(error => console.error('Error fetching location:', error));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

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
      {location && (
        <div className="text-gray-600 dark:text-gray-300 mt-1">
          Location: {location}
        </div>
      )}
    </div>
  );
} 