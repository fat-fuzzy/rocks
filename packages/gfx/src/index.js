/**
 * GL Library exports
 */

// Tools
import utils from './lib/math/utils'
import geometries from './lib/math/geometries'

/**
 * All graphics Sketches
 */

// Learning webgl from https://webglfundamentals.org/
import sketch_001 from './lib/sketches/fundamentals/001-random/index'
// import sketch_002 from './lib/sketches/002/index'
import sketch_003 from './lib/sketches/fundamentals/003-rectangle-2d/index'
import sketch_004 from './lib/sketches/fundamentals/004-geometry-2d/index'
import sketch_005 from './lib/sketches/fundamentals/005-matrix-2d/index'
import sketch_006 from './lib/sketches/fundamentals/006-hierarchical/index'
import sketch_007 from './lib/sketches/fundamentals/007-center-origin/index'
import sketch_008 from './lib/sketches/fundamentals/008-projection/index'
import sketch_009 from './lib/sketches/fundamentals/009-matrix-3d/index'
import sketch_010 from './lib/sketches/fundamentals/010-camera-3d/index'
import sketch_011 from './lib/sketches/fundamentals/011-animation-3d/index'
import sketch_012 from './lib/sketches/fundamentals/012-filters/index'
import sketch_013 from './lib/sketches/fundamentals/013-convolutions/index'
import sketch_014 from './lib/sketches/fundamentals/014-texture/index'
// import sketch_014 from ./lib/sketches/014-tex-blend/index'

// Fat Fuzzy Projects
import fat_fuzzy_001 from './lib/sketches/fat-fuzzy/001-wing-base/index'
// import fat_fuzzy_002 from './lib/sketches/fat-fuzzy/002-wing-feathers/index'
import fat_fuzzy_003 from './lib/sketches/fat-fuzzy/003-windless-wings/index'

const learning = [
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
	sketch_014,
	// sketch_014,
]

const projects = [
	fat_fuzzy_001,
	// fat_fuzzy_002,
	fat_fuzzy_003,
]

const gl = {
	sketches: {
		learning,
		projects,
	},
	utils,
	geometries,
}

export default {gl}
