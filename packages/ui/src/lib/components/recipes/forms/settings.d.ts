import type {Snippet} from 'svelte'
import type {
	UiState,
	UiState,
	UiBlockProps,
	FormProps,
	SwitchProps,
	FuzzyPayload,
} from '$types'

export type AppContextItems = {
	display: SwitchProps[]
	// language?:  ///
	links: {[key: string]: string}[]
	onupdate?: (payload: FuzzyPayload) => void
}

export type CookiePreferences = {
	functional?: boolean
	analytics?: boolean
	thirdParty?: boolean
}

export type ViewingPreferences = {
	reveal: string | UiState // TODO: generate @fat-fuzzy/ui types
	brightness?: string | UiSettings // TODO: generate @fat-fuzzy/ui types
	contrast?: string | UiSettings // TODO: generate @fat-fuzzy/ui types
	consent: CookiePreferences
}

export type SettingsProps = UiBlockProps &
	Partial<FormProps> & {
		id: string
		path?: string
		items: SwitchProps[]
		children?: Snippet
		onupdate?: (payload: FuzzyPayload) => void
	}

export type RevealContextProps = SettingsProps &
	UiLayoutProps & {
		breakpoint: string
	}
