/**
 * GL Library exports
 */

// Tools
import utils from './lib/utils'
import geometries from './lib/geometries'
// Sketches
import sketch_001 from './sketches/001-random/index'
// import sketch_002 from './sketches/002/index'
import sketch_003 from './sketches/003-rectangle-2d/index'
import sketch_004 from './sketches/004-geometry-2d/index'
import sketch_005 from './sketches/005-matrix-2d/index'
import sketch_006 from './sketches/006-hierarchical/index'
import sketch_007 from './sketches/007-center-origin/index'
import sketch_008 from './sketches/008-projection/index'
import sketch_009 from './sketches/009-matrix-3d/index'
import sketch_010 from './sketches/010-camera-3d/index'
import sketch_011 from './sketches/011-animation-3d/index'
import sketch_012 from './sketches/012-texture/index'
import sketch_013 from './sketches/013-convolution/index'

// Utilities
const sketches = {
	'001': sketch_001,
	// '002': sketch_002,
	'003': sketch_003,
	'004': sketch_004,
	'005': sketch_005,
	'006': sketch_006,
	'007': sketch_007,
	'008': sketch_008,
	'009': sketch_009,
	'010': sketch_010,
	'011': sketch_011,
	'012': sketch_012,
	'013': sketch_013,
}
// const sketches = [sketch_001, sketch_002, sketch_003, sketch_004]

const SKETCHES_FOLDER = './sketches'

export default {
	sketches,
	utils,
	geometries,
}
