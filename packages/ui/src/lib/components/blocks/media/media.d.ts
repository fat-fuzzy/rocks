import type { Snippet } from "svelte";
export type Source = {width: string; height: string; format: string}

export type MediaProps = {
	id?: string
	slug?: string
	src: string
	ext: string
	alt: string
	width: string
	height: string
	title?: string
	caption?: string
	style?: string
	orientation?: 'landscape' | 'portrait'
	loading?: 'lazy' | 'eager'
	dimensions?: string
	sources: Source[]
	sizes: {query?: string; slot: string}[]
	media?: {query?: string; srcset: {width: string; dpr: number}[]}[]
	context?: Snippet
}
