'use client';
import { useEffect, useState } from 'react';
import VisitorCounter from '../components/VisitorCounter';

export default function StatsPage() {
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
              // Extract state or country from the address components
              const address = data.address;
              const location = address.state || address.country || 'Location not available';
              setLocation(location);
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
      localStorage.setItem('visitorCount', '1');
      setVisitorCount(1);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Visitor Statistics
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Total Visitors
            </h2>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {visitorCount}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Location
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300">
              {location || 'Location not available'}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Detailed analytics are available in your Vercel dashboard.
          </p>
        </div>
      </div>
    </div>
  );
} 