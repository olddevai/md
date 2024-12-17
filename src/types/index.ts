export type Format = 'markdown' | 'html' | 'plaintext';

export interface ConversionHistory {
  id: string;
  timestamp: number;
  inputFormat: Format;
  outputFormat: Format;
  content: string;
}

export interface ThemeConfig {
  isDark: boolean;
  primary: string;
  secondary: string;
  accent: string;
}