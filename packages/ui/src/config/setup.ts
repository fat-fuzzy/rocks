import type {NavItem} from '$types'

// TODO: move to utils / clean
const navBase = {
	id: 'sidebar',
	label: 'Secondary Navigation',
	breakpoint: 'sm',
	size: 'sm',
	variant: 'outline',
	background: 'primary',
	color: 'neutral',
	formaction: 'toggleSidebar',
	actionPath: '/',
	items: [] as NavItem[],
}

export function buildNav(page: string, pages: {[key: string]: NavItem}) {
	if (!pages[page]) {
		return
	}

	const nav = {...navBase, ...pages[page]}
	nav.label = pages[page].title ?? pages[page].label ?? page
	nav.items = [structuredClone(pages[page])]

	return nav
}
