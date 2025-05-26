import type {Snippet} from 'svelte'
import {PictureProps} from '$types'

type ScrollyItemProps = {
	overlay?: boolean
	title: string
	link: string
	content: string
	asset: string
	image: PictureProps
}

type ScrollyProps = {
	title?: string
	level?: number
	fixed?: boolean
	dimensions?: string
	animations?: string[]
	items: ScrollyItemProps[]
	snap?: string
	magic?: {spell: string; shape?: string}
}
