import type {Snippet} from 'svelte'
import type {UiBlockProps, FormProps, SwitchProps, FuzzyPayload} from '$types'

export type SettingsItems = {
	switch: SwitchProps[]
	links: {[key: string]: string}[]
	onupdate?: (payload: FuzzyPayload) => void
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
