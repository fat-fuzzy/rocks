import type {UiSettings, SwitchProps, FuzzyPayload} from '$types'

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
	brightness: UiSettings
	contrast?: UiSettings
}

export type PrivacyPreferences = {
	consent: CookiePreferences
}
