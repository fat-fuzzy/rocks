import { includeIgnoreFile } from '@eslint/compat';
import baseConfig from '@fat-fuzzy/config/eslint/base';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Correctly determine gitignorePath relative to *this* eslint.config.js file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, './.gitignore');

// ESLint 9 expects an array
export default [
  includeIgnoreFile(gitignorePath),
  ...baseConfig,
  // Add any project-specific overrides or additional configurations here
  {
    // files: ['src/specific-app-folder/**/*.js'], // Example
    // rules: {
    //   'no-console': 'warn',
    // }
  }
];
