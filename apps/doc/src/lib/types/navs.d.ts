export type NavItem = {
	slug: string
	title: string
	asset?: string
	reveal?: string
	formaction?: string
	actionPath?: string
	redirect?: string
	items?: NavItem[]
}
