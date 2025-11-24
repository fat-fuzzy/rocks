import type {Snippet} from 'svelte'
import {PictureProps, MagicProps} from '$types'

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
	direction?: string
	dimensions?: string
	animations?: string[]
	items: ScrollyItemProps[]
	snap?: string
	magic?: MagicProps
}
