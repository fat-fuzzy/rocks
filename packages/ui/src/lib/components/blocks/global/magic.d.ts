import type {Snippet} from 'svelte'

export type MagicProps = {
	id?: string
	text?: string
	mask?: string
	spell: string
	level?: string
	uno?: string
	due?: string
	circle?: string
	shape?: string
	size?: string
	font?: string
	grow?: boolean
	children?: Snippet
}
