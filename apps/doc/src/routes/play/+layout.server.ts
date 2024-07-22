import lib from '@fat-fuzzy/lib'

export const load = () => {
	return {
		sketches: lib.gfx.sketches.map((sketch) => sketch.meta),
	}
}
