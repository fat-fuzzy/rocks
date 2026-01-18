export type NavItem = {
	slug: string
	title: string
	label?: string
	asset?: string
	reveal?: string
	formaction?: string
	actionPath?: string
	layout?: string
	items?: NavItem[]
}
