import type {Snippet} from 'svelte'
import type {UiBlockProps, FormProps, SettingsItems} from '$types'

export type HeaderProps = UiBlockProps &
	FormProps & {
		id?: string
		title?: string
		path?: string
		items: {
			links: {[key: string]: string}[]
			settings: SettingsItems
		}
		app: {settings: {[key: string]: string}}
		children?: Snippet
	}
