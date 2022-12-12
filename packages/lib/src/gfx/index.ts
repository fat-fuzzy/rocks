import type {Sketch} from './data'

export const SKETCHES_FOLDER = './sketches'

/**
 * Utilities
 */
import * as sketch001 from './sketches/001/'
import * as sketch002 from './sketches/002/'
import * as sketch003 from './sketches/003/'

export const sketches: {[key: string]: Sketch} = {
	sketch001,
	sketch002,
	sketch003,
}
