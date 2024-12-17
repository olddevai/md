import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { FormatSelector } from './components/FormatSelector';
import { Stats } from './components/Stats';
import { Format } from './types';
import { convertContent } from './utils/converter';
import { FileText } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [inputFormat, setInputFormat] = useState<Format>('markdown');
  const [outputFormat, setOutputFormat] = useState<Format>('html');
  const [inputContent, setInputContent] = useState('');
  const [outputContent, setOutputContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('lastInput');
    if (savedContent) {
      setInputContent(savedContent);
    }
  }, []);

  useEffect(() => {
    const converted = convertContent(inputContent, inputFormat, outputFormat);
    setOutputContent(converted);
    localStorage.setItem('lastInput', inputContent);
  }, [inputContent, inputFormat, outputFormat]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // TODO: Show success notification
    } catch (error) {
      console.error('Failed to copy:', error);
      // TODO: Show error notification
    }
  };

  const handleDownload = (content: string, format: Format) => {
    const extensions = { markdown: 'md', html: 'html', plaintext: 'txt' };
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${extensions[format]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputContent(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <FormatSelector
              format={inputFormat}
              onChange={setInputFormat}
              label="Input Format"
            />
            <FormatSelector
              format={outputFormat}
              onChange={setOutputFormat}
              label="Output Format"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              Upload File
              <input
                type="file"
                accept=".md,.txt,.html"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <Stats content={inputContent} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Editor
            content={inputContent}
            format={inputFormat}
            onChange={setInputContent}
            onCopy={() => handleCopy(inputContent)}
            onDownload={() => handleDownload(inputContent, inputFormat)}
          />
          <Editor
            content={outputContent}
            format={outputFormat}
            onChange={() => {}}
            onCopy={() => handleCopy(outputContent)}
            onDownload={() => handleDownload(outputContent, outputFormat)}
            readOnly
          />
        </div>
      </main>
    </div>
  );
}

export default App;