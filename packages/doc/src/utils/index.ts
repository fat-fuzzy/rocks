/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, Content } frontmatter metadata and a Content svelte component that renders the contents of the file
 */

export const fetchMarkdownData = async () => {
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
