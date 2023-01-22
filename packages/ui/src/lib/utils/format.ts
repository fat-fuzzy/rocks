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
	// TODO: format SVG icon
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
	return `${path}/${slug}`
}

export default {
	formatLabel,
	formatHref,
}
