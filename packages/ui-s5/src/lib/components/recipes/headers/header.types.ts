import type {Snippet} from 'svelte'

import type {UiStyleProps} from '$types/index.js'
import type {FormProps} from '$lib/components/recipes/forms/forms.types.js'
import type {SettingsItems} from '$lib/components/recipes/forms/settings.types.js'

export type HeaderProps = UiStyleProps &
	FormProps & {
		id?: string
		title?: string
		items: {
			links: {[key: string]: string}[]
			settings: SettingsItems
		}
		children?: Snippet
	}
