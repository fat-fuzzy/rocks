export type Tab = UiBlockProps & {
	slug: string
	id?: string
	title: string
	initial?: boolean
	header?: Snippet
	content?: Snippet
	labelledBy?: string
}

export type TabsProps = UiLayoutProps & {
	id: string
	path?: string
	tabs: Tab[]
}
