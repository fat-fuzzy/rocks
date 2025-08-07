import mainConfig from './rollup.config.main.js'
import libConfig from './rollup.config.lib.js'
import scssConfig from './rollup.config.scss.js'

/**
 * This config will run each config in order and output a css library in "dist/lib/"
 */
export default [scssConfig, mainConfig, libConfig]
