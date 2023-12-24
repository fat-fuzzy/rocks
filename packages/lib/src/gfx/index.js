/**
 * GL Library exports
 */

// Tools
import utils from './lib/utils'
import constants from './lib/constants'
// Sketches
import sketch_001 from './sketches/001/index'
// import sketch_002 from './sketches/002/index'
import sketch_003 from './sketches/003/index'
import sketch_004 from './sketches/004/index'

// Utilities
const sketches = {
	'001': sketch_001,
	// '002': sketch_002,
	'003': sketch_003,
	'004': sketch_004,
}
// const sketches = [sketch_001, sketch_002, sketch_003, sketch_004]

const SKETCHES_FOLDER = './sketches'

export default {
	sketches,
	utils,
	constants,
}
