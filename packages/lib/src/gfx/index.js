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
import sketch_005 from './sketches/005/index'
import sketch_006 from './sketches/006/index'
import sketch_007 from './sketches/007/index'

// Utilities
const sketches = {
	'001': sketch_001,
	// '002': sketch_002,
	'003': sketch_003,
	'004': sketch_004,
	'005': sketch_005,
	'006': sketch_006,
	'007': sketch_007,
}
// const sketches = [sketch_001, sketch_002, sketch_003, sketch_004]

const SKETCHES_FOLDER = './sketches'

export default {
	sketches,
	utils,
	constants,
}
