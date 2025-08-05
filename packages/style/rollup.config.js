import * as glob from 'glob'
import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import postcssMinify from '@csstools/postcss-minify'
import fs from 'node:fs'
import path from 'node:path'

import mainConfig from './rollup.config.main.js'
import libConfig from './rollup.config.lib.js'
import scssConfig from './rollup.config.scss.js'

const production = process.env.NODE_ENV === 'production'
const inDir = path.resolve('src/lib')
const outDir = path.resolve('dist')
const cssFiles = glob.sync('src/lib/css/**/*.css')

// Always clean the dist folder before building.
fs.rmSync(outDir, {recursive: true, force: true})
fs.mkdirSync(outDir)

/**
 * This config will run each config in order and output a css library in "dist/lib/"
 */
export default [scssConfig, mainConfig, libConfig]
