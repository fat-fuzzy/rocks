import type {Snippet} from 'svelte'
import type {
	FormCommonProps,
	LayoutPrimitiveProps,
	UiBlockProps,
	UiAnimationEvent,
	FuzzyPayload,
} from '$types'

export type RevealLayoutProps = LayoutPrimitiveProps &
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
		onclickoutside?: () => void
		init?: (payload: FuzzyPayload) => void
	}

export type RevealTrainProps = LayoutPrimitiveProps &
	UiBlockProps &
	FormCommonProps & {
		element?: string // Element can be a string defining an HTML tag or a tag.class composed name. Ex: element = 'aside.page-context'
		area?: string
		reveal: {id: string; state: string}
		stations: RevealLayoutProps[]
		platforms: Snippet[]
		children?: Snippet
	}
