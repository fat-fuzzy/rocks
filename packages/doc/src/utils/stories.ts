/**
 * Load Decision data from markdown files contained in 'src/data/decisions'
 *
 * @returns { meta, path } frontmatter metadata and path of markdown files to load
 */

export const fetchComponentData = async () => {
	const uiImports = await import('@fat-fuzzy/ui');
	const blocks = Object.keys(uiImports.blocks).map((k) => k.toLowerCase());
	const layouts = Object.keys(uiImports.layouts).map((k) => k.toLowerCase());

	// const allData = await Promise.all(
	// 	// TODO: understand this vite functionality
	// 	iterableMDFiles.map(async ([path, resolver]) => {
	// 		const { metadata } = await resolver();
	// 		const filePath = path.slice(10, -3); // removes '/src/data' and '*.md'

	// 		return {
	// 			meta: metadata,
	// 			path: filePath
	// 		};
	// 	})
	// );

	// return allData;
	return { components: { blocks, layouts } };
};
