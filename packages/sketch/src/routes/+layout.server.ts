import gfx from '@fat-fuzzy/gfx'

export const load = () => {
	return {
		sketches: gfx.gl.sketches.map((sketch) => sketch.meta),
	}
}
