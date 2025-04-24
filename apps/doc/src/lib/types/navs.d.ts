export type NavItem = {
	slug: string
	title: string
	label?: string
	asset?: string
	formaction?: string
	layout?: string
	items?: NavItem[]
}
