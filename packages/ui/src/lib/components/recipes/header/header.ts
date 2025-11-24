import type {Snippet} from 'svelte'
import type {UiBlockProps, FormProps, AppContextItems} from '$types'

export type HeaderProps = UiBlockProps &
	FormProps & {
		id?: string
		title?: string
		path?: string
		position?: string
		placement?: string
		main: {[key: string]: string}[]
		sidebar?: Snippet
		context: AppContextItems
		app: {[key: string]: string}
		children?: Snippet
	}
