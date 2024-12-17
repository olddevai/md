import React, { useEffect, useRef } from 'react';
import { Format } from '../types';
import { Copy, Download } from 'lucide-react';

interface EditorProps {
  content: string;
  format: Format;
  onChange: (value: string) => void;
  onCopy: () => void;
  onDownload: () => void;
  readOnly?: boolean;
}

export const Editor: React.FC<EditorProps> = ({
  content,
  format,
  onChange,
  onCopy,
  onDownload,
  readOnly = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  return (
    <div className="relative h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {format}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={onCopy}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Copy content"
          >
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={onDownload}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Download content"
          >
            <Download className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        className="flex-1 w-full p-4 font-mono text-sm bg-transparent resize-none focus:outline-none dark:text-white"
        placeholder={`Enter ${format} content here...`}
      />
    </div>
  );
};