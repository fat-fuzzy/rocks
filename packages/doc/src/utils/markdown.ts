/**
 * Load Decision data from markdown files contained in 'src/data/decisions'
 *
 * @returns { meta, path } frontmatter metadata and path of markdown files to load
 */

export const fetchDecisionsFileData = async () => {
	const allMDFiles = import.meta.glob('/src/data/decisions/*.md');
	const iterableMDFiles = Object.entries(allMDFiles);

	const allData = await Promise.all(
		// TODO: understand this vite functionality
		iterableMDFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const filePath = path.slice(10, -3); // removes '/src/routes' and '*.md'

			return {
				meta: metadata,
				path: filePath
			};
		})
	);

	return allData;
};
