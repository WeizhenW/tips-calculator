'use client';
import { useState } from 'react';

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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Tip
          </button>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
