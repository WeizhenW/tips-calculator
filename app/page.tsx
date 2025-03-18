'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mealPrice, setMealPrice] = useState('');
  const [tipPercentage, setTipPercentage] = useState(20);
  const [customTipPercentage, setCustomTipPercentage] = useState('');
  const [tip, setTip] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
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
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Calculate Tip
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
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
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Round Down
                </button>
                <button
                  type="button"
                  onClick={() => handleRound('up')}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Round Up
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
