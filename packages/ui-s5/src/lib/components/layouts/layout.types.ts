import type {Snippet} from 'svelte'
import type {UiStyleProps} from '$types/index.js'

type LayoutProps = UiStyleProps & {
	id: string
	title?: string
	method?: string
	formaction?: string
	actionPath?: string
	redirect?: string
	content?: Snippet
}
