import gfx from '@fat-fuzzy/gfx'

export const load = ({params}) => {
	const learning = gfx.gl.sketches.learning.find((s) => {
		return s.meta.slug === params.slug
	})?.meta

	return learning
}
