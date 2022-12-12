/**
 * Load Sketches data from '@fat-fuzzy/lib'
 */

export const fetchSketchesData = async () => {
	const lib = await import('@fat-fuzzy/lib')
	if (lib && lib.default) {
		const {gl} = lib.default
		return {sketches: gl.sketches}
	}
}

/**
 * Load Sketches data from markdown files contained in 'src/data/sketches'
 *
 * @returns { meta, path } frontmatter metadata and path of markdown files to load
 */

export const fetchSketchesFileData = async () => {
	const allMDFiles = import.meta.glob('/src/data/sketches/*.json')
	const iterableMDFiles = Object.entries(allMDFiles)

	const allData = await Promise.all(
		// TODO: understand this vite functionality
		iterableMDFiles.map(async ([path, resolver]) => {
			const {metadata} = await resolver()
			const filePath = path.slice(10, -5) // removes '/src/data' and '*.md'
			console.log('path')
			console.log(path)

			return {
				path: filePath,
			}
		}),
	)

	return allData
}
