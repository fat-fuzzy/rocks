import type {Snippet} from 'svelte'

export type MagicProps = {
	text?: string
	spell: string
	level?: string
	uno?: string
	due?: string
	size: string
	grow?: boolean
	children?: Snippet
}
