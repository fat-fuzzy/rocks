import type {Snippet} from 'svelte'
import type {UiBlockProps, FormProps, SwitchProps, FuzzyPayload} from '$types'

export type SettingsItems = {
	switch: SwitchProps[]
	links: {[key: string]: string}[]
	onupdate?: (payload: FuzzyPayload) => void
}

export type SettingsProps = UiBlockProps &
	Partial<FormProps> & {
		breakpoint: string
		id: string
		path?: String
		items: SettingsItems
		children?: Snippet
		onupdate?: (payload: FuzzyPayload) => void
	}
