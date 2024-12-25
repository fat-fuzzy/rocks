export type DocProps = string[]

export type StateProps = string[]

export type StyleProps = {[key: string]: {[key: string]: string[]}}

export type PlaybookProps = {
	doc?: DocProps
	style?: StyleProps
	state?: StateProps
}

export type Meta = {
	title: string
	slug: string
	category?: string
	group?: string
	props_style?: StyleProps
	props_state?: StateProps
	content_types?: string[]
	context: string[]
	status: string
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

export type Settings = {
	[key: string]: string
}

export type Tab = {
	id: string
	name: string
	title: string
	value?: string
	initial?: string
	size?: string
	color?: string
	asset?: string
}
