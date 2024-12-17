import React from 'react';
import { Sun, Moon, Github } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="w-full px-6 py-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Format Converter</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-gray-200" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Github className="w-5 h-5 text-gray-600 dark:text-gray-200" />
          </a>
        </div>
      </div>
    </header>
  );
};