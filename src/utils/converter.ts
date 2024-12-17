import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Format } from '../types';

export const convertContent = (content: string, from: Format, to: Format): string => {
  if (from === to) return content;

  try {
    if (from === 'markdown') {
      if (to === 'html') {
        return DOMPurify.sanitize(marked(content));
      }
      if (to === 'plaintext') {
        return marked(content).replace(/<[^>]*>/g, '');
      }
    }

    if (from === 'html') {
      if (to === 'plaintext') {
        const temp = document.createElement('div');
        temp.innerHTML = DOMPurify.sanitize(content);
        return temp.textContent || '';
      }
      if (to === 'markdown') {
        // Basic HTML to Markdown conversion
        return content
          .replace(/<h1>(.*?)<\/h1>/g, '# $1\n')
          .replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
          .replace(/<p>(.*?)<\/p>/g, '$1\n')
          .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
          .replace(/<em>(.*?)<\/em>/g, '*$1*')
          .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');
      }
    }

    if (from === 'plaintext') {
      if (to === 'html') {
        return content.split('\n').map(line => `<p>${line}</p>`).join('\n');
      }
      if (to === 'markdown') {
        return content;
      }
    }

    return content;
  } catch (error) {
    console.error('Conversion error:', error);
    return content;
  }
};