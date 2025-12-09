import type {Snippet} from 'svelte'
import type {
	UiState,
	UiSettings,
	UiBlockProps,
	UiLayoutProps,
	FormCommonProps,
	SwitchProps,
	FuzzyPayload,
} from '$types'

export type AppContextItems = {
	display: SwitchProps[]
	// language?:  ///
	onupdate?: (payload: FuzzyPayload) => void
}

export type CookiePreferences = {
	functional?: boolean
	legitimateInterest?: boolean
	analytics?: boolean
}

export type ViewingPreferences = {
	reveal: string | UiState // TODO: generate @fat-fuzzy/ui types
	brightness?: string | UiSettings // TODO: generate @fat-fuzzy/ui types
	contrast?: string | UiSettings // TODO: generate @fat-fuzzy/ui types
	consent: CookiePreferences
}

export type SettingsProps = UiBlockProps &
	FormCommonProps & {
		id: string
		path?: string
		items: SwitchProps[]
		children?: Snippet
		onupdate?: (payload: FuzzyPayload) => void
	}

export type RevealContextProps = SettingsProps &
	UiLayoutProps &
	FormCommonProps & {
		breakpoint: string
		text?: string
		reveal: UiState
		actionPath?: string
		context: ViewingPreferences
	}
