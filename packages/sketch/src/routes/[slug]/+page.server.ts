import sketches from '$lib/data/sketches'

export const load = ({params}) => {
	const sketchData = sketches.find((s) => {
		return s.slug === params.slug
	})

	return sketchData
}
