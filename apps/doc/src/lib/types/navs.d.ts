export type NavItem = {
	slug: string
	title: string
	label?: string
	asset?: string
	formaction?: string
	items?: NavItem[]
}
