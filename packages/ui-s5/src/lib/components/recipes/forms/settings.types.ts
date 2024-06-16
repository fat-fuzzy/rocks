import type {Snippet} from 'svelte'

import type {UiBlockProps} from '$types/index.js'
import type {FormProps} from '$lib/components/recipes/forms/forms.types.js'
import type {SwitchProps} from '$lib/components/blocks/buttons/Switch/switch.types.js'

export type SettingsItems = {
	switch: SwitchProps[]
	links: {[key: string]: string}[]
	onupdate?: (payload: {
		name: string
		value: string | number
		state: string
	}) => void
}

export type SettingsProps = UiBlockProps &
	FormProps & {
		breakpoint: string
		id: string
		path?: String
		items: SettingsItems
		children?: Snippet
		onupdate?: (payload: {
			name: string
			value: string | number
			state: string
		}) => void
	}
