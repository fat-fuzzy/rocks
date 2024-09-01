export const prerender = false
export const ssr = true

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load = async ({params}) => {
	const {slug} = params
	const ext = 'jpeg' // TODO: get file extension from file
	const alt = slug.replace(/-/g, ' ') // TODO: Add a proper alt text
	const path = 'images' // TODO: Handle other types of media
	const orientation = 'portrait' // TODO: Handle other types of media
	return {
		src: `/${path}/${params.slug}`,
		alt,
		ext,
		path,
		orientation,
	}
}
