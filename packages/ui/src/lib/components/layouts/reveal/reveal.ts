import type {Snippet} from 'svelte'
import type {
	FormProps,
	LayoutProps,
	UiBlockProps,
	UiAnimationEvent,
	FuzzyPayload,
} from '$types'

export type RevealLayoutProps = LayoutProps &
	UiBlockProps &
	FormProps & {
		reveal: string
		auto?: boolean
		element?: string
		trigger?: UiAnimationEvent
		dismiss?: string
		onclick?: (payload: FuzzyPayload) => void
	}

export type RevealTrainProps = LayoutProps &
	UiBlockProps &
	FormProps & {
		element?: string // Element can be a string defining an HTML tag or a tag.class composed name. Ex: element = 'aside.page-context'
		area?: string
		reveal: {id: string; state: string}
		stations: RevealLayoutProps[]
		platforms: Snippet[]
		terminus?: Snippet
	}
