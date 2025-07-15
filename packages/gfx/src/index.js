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
import learning_001 from './lib/sketches/fundamentals/001-random/index'
// import learning_002 from './lib/sketches/002/index'
import learning_003 from './lib/sketches/fundamentals/003-rectangle-2d/index'
import learning_004 from './lib/sketches/fundamentals/004-geometry-2d/index'
import learning_005 from './lib/sketches/fundamentals/005-matrix-2d/index'
import learning_006 from './lib/sketches/fundamentals/006-hierarchical/index'
import learning_007 from './lib/sketches/fundamentals/007-center-origin/index'
import learning_008 from './lib/sketches/fundamentals/008-projection/index'
import learning_009 from './lib/sketches/fundamentals/009-matrix-3d/index'
import learning_010 from './lib/sketches/fundamentals/010-camera-3d/index'
import learning_011 from './lib/sketches/fundamentals/011-animation-3d/index'
import learning_012 from './lib/sketches/fundamentals/012-filters/index'
import learning_013 from './lib/sketches/fundamentals/013-convolutions/index'
import learning_014 from './lib/sketches/fundamentals/014-texture/index'
// import learning_014 from ./lib/sketches/014-tex-blend/index'

// Fat Fuzzy Projects
import projects_001 from './lib/sketches/fat-fuzzy/001-wing-base/index'
// import projects_002 from './lib/sketches/fat-fuzzy/002-wing-feathers/index'
import projects_003 from './lib/sketches/fat-fuzzy/003-wabi-sabi/index'

const learning = [
	learning_001,
	// '002': learning_002,
	learning_003,
	learning_004,
	learning_005,
	learning_006,
	learning_007,
	learning_008,
	learning_009,
	learning_010,
	learning_011,
	learning_012,
	learning_013,
	learning_014,
	// learning_014,
]

const projects = [
	projects_001,
	// projects_002,
	projects_003,
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
