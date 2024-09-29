/**
 * GL Library exports
 */

// Tools
import utils from './src/lib/utils'
import geometries from './src/lib/geometries'
// Sketches
import sketch_001 from './src/sketches/001-random/index'
// import sketch_002 from './src/sketches/002/index'
import sketch_003 from './src/sketches/003-rectangle-2d/index'
import sketch_004 from './src/sketches/004-geometry-2d/index'
import sketch_005 from './src/sketches/005-matrix-2d/index'
import sketch_006 from './src/sketches/006-hierarchical/index'
import sketch_007 from './src/sketches/007-center-origin/index'
import sketch_008 from './src/sketches/008-projection/index'
import sketch_009 from './src/sketches/009-matrix-3d/index'
import sketch_010 from './src/sketches/010-camera-3d/index'
import sketch_011 from './src/sketches/011-animation-3d/index'
import sketch_012 from './src/sketches/012-texture/index'
import sketch_013 from './src/sketches/013-convolutions/index'
// import sketch_014 from ./src/sketches/014-tex-blend/index'

const sketches = [
	sketch_001,
	// '002': sketch_002,
	sketch_003,
	sketch_004,
	sketch_005,
	sketch_006,
	sketch_007,
	sketch_008,
	sketch_009,
	sketch_010,
	sketch_011,
	sketch_012,
	sketch_013,
	// sketch_014,
]

export default {
	sketches,
	utils,
	geometries,
}
