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
		element?: string
		area?: string
		reveal: {id: string; state: string}
		stations: RevealLayoutProps[]
		platforms: Snippet[]
		terminus?: Snippet
	}
