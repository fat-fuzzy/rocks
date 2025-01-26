import type {Snippet} from 'svelte'
import {PictureProps} from '$types'

type SequenceItemProps = {
	id: string
	overlay?: boolean
	title: string
	link: string
	content: string
	asset: string
	image: PictureProps
}

type SequenceProps = {
	title: string
	description: string
	pageName?: string
	header?: Snippet
	level?: number
	size?: string
	layout?: string
	justify?: string
	dimensions?: string
	direction?: string
	mode?: string
	items: SequenceItemProps[]
}
