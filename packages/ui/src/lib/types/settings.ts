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

// FIXME: this should be generated
export type SignUp = {
	user?: string
	email?: string
	password?: string
	confirm_password?: string
}
