import type {Snippet} from 'svelte'
import type {
	FormCommonProps,
	LayoutProps,
	UiBlockProps,
	UiAnimationEvent,
	FuzzyPayload,
} from '$types'

export type RevealLayoutProps = LayoutProps &
	UiBlockProps &
	FormCommonProps & {
		area?: string
		reveal: string
		auto?: boolean
		element?: string
		trigger?: UiAnimationEvent
		dismiss?: string
		text?: string
		onclick?: (payload: FuzzyPayload) => void
		init?: (payload: FuzzyPayload) => void
	}

export type RevealTrainProps = LayoutProps &
	UiBlockProps &
	FormCommonProps & {
		element?: string // Element can be a string defining an HTML tag or a tag.class composed name. Ex: element = 'aside.page-context'
		area?: string
		reveal: {id: string; state: string}
		stations: RevealLayoutProps[]
		platforms: Snippet[]
		children?: Snippet
	}
