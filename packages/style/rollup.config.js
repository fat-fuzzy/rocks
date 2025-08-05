import fs from 'node:fs'
import path from 'node:path'

import mainConfig from './rollup.config.main.js'
import libConfig from './rollup.config.lib.js'
import scssConfig from './rollup.config.scss.js'

const outDir = path.resolve('dist')

// Always clean the dist folder before building.
fs.rmSync(outDir, {recursive: true, force: true})
fs.mkdirSync(outDir)

/**
 * This config will run each config in order and output a css library in "dist/lib/"
 */
export default [scssConfig, mainConfig, libConfig]
