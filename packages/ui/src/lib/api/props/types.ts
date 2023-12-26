export type Meta = {
	title: string
	slug: string
	category?: string
	group?: string
	props_style?: any
	props_state?: string[]
	content_types?: string[]
	context: string[]
}

export type Markdown = {html: string; meta: Meta}

export type Markdowns = {
	categories: Markdown[]
	tokens: Markdown[]
	blocks: Markdown[]
	layouts: Markdown[]
	recipes: Markdown[]
	graphics: Markdown[]
}
