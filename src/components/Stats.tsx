import React from 'react';

interface StatsProps {
  content: string;
}

export const Stats: React.FC<StatsProps> = ({ content }) => {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  return (
    <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
      <span>{wordCount} words</span>
      <span>{charCount} characters</span>
    </div>
  );
};