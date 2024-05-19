import lib from '@fat-fuzzy/lib'

export const load = ({params}) => {
	const sketchData = lib.gfx.sketches.find((s) => {
		return s.meta.slug === params.slug
	})?.meta

	return sketchData
}
