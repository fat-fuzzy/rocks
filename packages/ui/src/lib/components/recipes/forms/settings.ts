import type {
	UiState,
	UiSettings,
	UiBlockProps,
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
	reveal: UiState
	brightness: UiSettings
	contrast?: UiSettings
	consent: CookiePreferences
}

export type SettingsProps = UiBlockProps &
	FormCommonProps & {
		id: string
		name: string
		path?: string
		items: SwitchProps[]
	}

export type RevealContextProps = UiBlockProps &
	FormCommonProps & {
		path?: string
		actionPath?: string
		context: ViewingPreferences
	}
