import type {LayoutLoad} from './$types'
import * as ui from '@fat-fuzzy/ui'
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, Content } frontmatter metadata and a Content svelte component that renders the contents of the file
 */
export const load: LayoutLoad = async ({params}) => {
	const categoryItems = ui[params.category]
	return {
		category: params.category,
		items: categoryItems,
	}
}
