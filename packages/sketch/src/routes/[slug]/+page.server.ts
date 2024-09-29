import gfx from '@fat-fuzzy/gfx'

export const load = ({params}) => {
	const sketchData = gfx.gl.sketches.find((s) => {
		return s.meta.slug === params.slug
	})?.meta

	return sketchData
}
