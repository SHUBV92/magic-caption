'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Magic Caption
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/upload"
                className="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Upload
              </Link>
              <Link
                href="/editor"
                className="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Editor
              </Link>
              <Link
                href="/inspiration"
                className="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Get Inspired
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;