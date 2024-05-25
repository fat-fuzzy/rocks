import type {Snippet} from 'svelte'
import type {UiStyleProps} from '$types/index.js'
import type {FormProps} from '../recipes/forms/forms.types.js'

export type LayoutProps = UiStyleProps &
	FormProps & {
		id: string
		title?: string
		content?: Snippet
	}

export type RevealLayoutProps = LayoutProps & {
	reveal: string
}
