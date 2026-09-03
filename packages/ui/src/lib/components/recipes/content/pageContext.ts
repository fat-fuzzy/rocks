import type {UiStatus, UiSurface} from '$types'
import type {Snippet} from 'svelte'

export type AsideProps = {
	status?: UiStatus
	created?: string
	updated?: string
	series?: {link: string; title: string}[]
	children?: Snippet
	page?: number
	surface?: UiSurface
	surfaceLightness?: number
}
