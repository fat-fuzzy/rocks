/**
 *
 * @param name
 * @param icon
 * @returns
 */
function emojiLabel(text: string, emoji: string) {
	return `${emoji} ${text}`
}

function svgLabel(text: string, svg: SVGElement) {
	// TODO: format SVG icon + text node
	return text
}

function formatLabel(text: string, asset?: string | SVGElement) {
	if (asset) {
		switch (typeof asset) {
			case 'string':
				return emojiLabel(text, asset)
			default:
				return svgLabel(text, asset)
		}
	}
	return text
}

function formatHref(path: string, slug: string) {
	return slug ? `${path}/${slug}` : path
}

function getClassNameFromPathname(path: string) {
	return path === '/' ? 'page:home' : `page:${path.slice(1, path.length)}`
}

function capitalize(category: string) {
	return `${category.slice(0, 1).toUpperCase()}${category.slice(1, category.length)}`
}

export default {
	formatLabel,
	formatHref,
	getClassNameFromPathname,
	capitalize,
}
