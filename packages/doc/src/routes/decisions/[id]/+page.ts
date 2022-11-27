/**
 * Load data from [.md] file based on route parameters
 * @param params Request parameters
 * @returns
 */
export async function load({ params }) {
	try {
		const post = await import(`../${params.id}.md`);
		const { title, year } = post.metadata;
		const Content = post.default;

		return {
			title,
			year,
			Content // capitalize this to use component <Content />
		};
	} catch (error) {
		console.log(error);
	}
}
