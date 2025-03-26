import type {Snippet} from 'svelte'
import type {
	UiState,
	UiState,
	UiBlockProps,
	FormProps,
	SwitchProps,
	FuzzyPayload,
} from '$types'
import {Preferences} from '$types'

export type SettingsItems = {
	switch: SwitchProps[]
	links: {[key: string]: string}[]
	onupdate?: (payload: FuzzyPayload) => void
}

export type CookiePreferences = {
	functional: boolean
	analytics: boolean
	thirdParty?: boolean
}

export type ViewingPreferences = {
	reveal: UiState
	brightness: string
	contrast: string
	cookies: CookiePreferences
}

export type SettingsProps = UiBlockProps &
	Partial<FormProps> & {
		id: string
		path?: String
		items: SwitchProps[]
		children?: Snippet
		onupdate?: (payload: FuzzyPayload) => void
	}

export type RevealSettingsProps = SettingsProps &
	UiLayoutProps & {
		breakpoint: string
	}
