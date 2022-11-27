export const fetchMarkdownData = async () => {
	const allMDFiles = import.meta.glob('/src/routes/decisions/*.md');
	const iterableMDFiles = Object.entries(allMDFiles);

	const allData = await Promise.all(
		iterableMDFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const filePath = path.slice(11, -3); // removes '/src/routes' and '*.md'

			return {
				meta: metadata,
				path: filePath
			};
		})
	);

	return allData;
};
