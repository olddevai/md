import React from 'react';
import { Format } from '../types';

interface FormatSelectorProps {
  format: Format;
  onChange: (format: Format) => void;
  label: string;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({ format, onChange, label }) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <select
        value={format}
        onChange={(e) => onChange(e.target.value as Format)}
        className="block w-32 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="markdown">Markdown</option>
        <option value="html">HTML</option>
        <option value="plaintext">Plain Text</option>
      </select>
    </div>
  );
};