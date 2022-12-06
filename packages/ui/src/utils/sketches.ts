/**
 * Load Decision data from markdown files contained in 'src/data/decisions'
 *
 * @returns { meta, path } frontmatter metadata and path of markdown files to load
 */

export const fetchSketchesData = async () => {
	console.log('fetchSketchesData lib')
	const lib = await import('@fat-fuzzy/lib')
	console.log(lib)
	if (lib) {
		return {sketches: lib}
	}
}
