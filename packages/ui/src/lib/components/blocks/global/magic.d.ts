import type {Snippet} from 'svelte'

export type MagicProps = {
	text: string
	spell: string
	daemons: {
		uno: string
		dos: string
	}
	size: string
}
