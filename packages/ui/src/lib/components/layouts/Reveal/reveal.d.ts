export type RevealLayoutProps = LayoutProps &
	UiBlockProps & {
		reveal: string
		auto?: boolean
		element?: string
		trigger?: UiAnimationEvent
		dismiss?: DismissEvent
		onclick?: (payload: FuzzyPayload) => void
	}

export type RevealTrainProps = LayoutProps &
	UiBlockProps & {
		element?: string // Element can be a string defining an HTML tag or a tag.class composed name. Ex: element = 'aside.page-context'
		area?: string
		reveal: {id: string; state: string}
		stations: RevealLayoutProps[]
		platforms: Snippet[]
		terminus?: Snippet
	}
