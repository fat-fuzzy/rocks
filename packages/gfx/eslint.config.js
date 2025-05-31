import baseConfig from '@fat-fuzzy/config/eslint/base'
import {includeIgnoreFile} from '@eslint/compat'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

// Correctly determine gitignorePath relative to *this* eslint.config.js file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Apply gitignore at the project level
const gitignorePath = path.resolve(__dirname, './.gitignore')

export default [includeIgnoreFile(gitignorePath), ...baseConfig]
