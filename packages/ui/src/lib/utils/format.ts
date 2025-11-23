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
	formatHref,
	getClassNameFromPathname,
	capitalize,
}
