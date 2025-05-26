import gfx from '@fat-fuzzy/gfx'

let learning = gfx.gl.sketches.learning
	.filter((sketch) => !sketch.meta.draft)
	.map((sketch) => sketch.meta)

export const load = () => {
	return {
		sketches: learning,
	}
}
