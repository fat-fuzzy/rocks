import blog from '$data/blog'

export const load = async (event) => {
	const posts = await blog.markdowns

	const data = {
		markdowns: posts.filter(({meta}) => meta.status !== 'draft'),
	}

	return data
}
