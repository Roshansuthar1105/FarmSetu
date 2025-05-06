import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle theme clicked, current theme:', theme);
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full transition-colors ${className} ${
        theme === 'dark'
          ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      }`}
      aria-label={theme === 'dark' ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
      title={theme === 'dark' ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
    >
      {theme === 'dark' ? (
        <FaSun className="h-5 w-5" data-testid="sun-icon" />
      ) : (
        <FaMoon className="h-5 w-5" data-testid="moon-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
