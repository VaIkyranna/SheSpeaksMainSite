'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useState } from 'react';

export function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {showTooltip && (
        <div className="mb-2 px-3 py-2 text-sm text-white bg-gray-800 dark:bg-gray-700 rounded-md shadow-lg">
          {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        </div>
      )}
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-blue-500"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
