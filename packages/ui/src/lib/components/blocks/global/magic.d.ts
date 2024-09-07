import type {Snippet} from 'svelte'

export type MagicProps = {
	text?: string
	spell: string
	level?: string
	uno: string
	dos: string
	size: string
	children?: Snippet
}
