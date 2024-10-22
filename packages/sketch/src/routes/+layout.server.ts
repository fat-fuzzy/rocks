import gfx from '@fat-fuzzy/gfx'

export const load = () => {
	return {
		sketches: gfx.gl.sketches.learning.map((sketch) => sketch.meta),
	}
}
