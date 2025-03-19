'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mealPrice, setMealPrice] = useState('');
  const [tipPercentage, setTipPercentage] = useState(20);
  const [customTipPercentage, setCustomTipPercentage] = useState('');
  const [tip, setTip] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const calculateTip = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(mealPrice);
    if (!isNaN(price)) {
      setTip(price * (tipPercentage / 100));
      setShowResult(true);
    }
  };

  const handleRound = (direction: 'up' | 'down') => {
    if (tip !== null) {
      const roundedTip = direction === 'up' ? Math.ceil(tip) : Math.floor(tip);
      setTip(roundedTip);
    }
  };

  const handleTipButtonClick = (percentage: number) => {
    setTipPercentage(percentage);
    setCustomTipPercentage('');
    setShowResult(false);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCustomTipPercentage('');
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setCustomTipPercentage(value);
      setTipPercentage(numValue);
      setShowResult(false);
    }
  };

  const handleMealPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealPrice(e.target.value);
    setShowResult(false);
  };

  const handleClear = () => {
    setMealPrice('');
    setTipPercentage(20);
    setCustomTipPercentage('');
    setTip(null);
    setShowResult(false);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('mealPrice', mealPrice);
    url.searchParams.set('tipPercentage', tipPercentage.toString());
    url.searchParams.set('tip', tip !== null ? tip.toFixed(2) : '');
    navigator.clipboard.writeText(url.toString()).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mealPriceParam = params.get('mealPrice');
    const tipPercentageParam = params.get('tipPercentage');
    const tipParam = params.get('tip');

    if (mealPriceParam && tipPercentageParam && tipParam) {
      setMealPrice(mealPriceParam);
      setTipPercentage(parseFloat(tipPercentageParam));
      setTip(parseFloat(tipParam));
      setShowResult(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative">
        {showTooltip && (
          <div className="absolute bottom-16 right-0 mb-2 mr-2 bg-gray-700 text-white text-xs rounded py-1 px-2">
            Link copied!
          </div>
        )}
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Tip Calculator
        </h1>

        <form onSubmit={calculateTip} className="space-y-6">
          <div>
            <label htmlFor="mealPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meal Price (before tax)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="mealPrice"
                value={mealPrice}
                onChange={handleMealPriceChange}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tip Percentage
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <button
                type="button"
                onClick={() => handleTipButtonClick(15)}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  tipPercentage === 15
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                15%
              </button>
              <button
                type="button"
                onClick={() => handleTipButtonClick(18)}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  tipPercentage === 18
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                18%
              </button>
              <button
                type="button"
                onClick={() => handleTipButtonClick(20)}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  tipPercentage === 20
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                20%
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                value={customTipPercentage}
                onChange={handleCustomTipChange}
                className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Custom %"
                step="0.1"
                min="0"
                max="100"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
              </svg>
              Calculate Tip
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Clear
            </button>
          </div>
        </form>

        {showResult && tip !== null && (
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Result</h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                Meal Price: ${parseFloat(mealPrice).toFixed(2)}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Tip ({tipPercentage}%): ${tip.toFixed(2)}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Total: ${(parseFloat(mealPrice) + tip).toFixed(2)}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => handleRound('down')}
                  className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg font-medium border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Round Down</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRound('up')}
                  className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg font-medium border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Round Up</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15 8a3 3 0 00-2.83 2H7.83a3 3 0 100 2h4.34a3 3 0 102.83-2H7.83a3 3 0 100-2h4.34A3 3 0 1015 8zM5 10a1 1 0 110-2 1 1 0 010 2zm10 4a1 1 0 110-2 1 1 0 010 2zm0-8a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/stats" className="hover:text-gray-700 dark:hover:text-gray-300">
          View Statistics
        </Link>
      </footer>
    </div>
  );
}
