import type {Snippet} from 'svelte'

export type AsideProps = {
	created?: string
	updated?: string
	series?: {link: string; title: string}[]
	children?: Snippet
	page?: number
}
