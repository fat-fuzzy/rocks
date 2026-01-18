import type {MediaProps, MagicProps} from '$types'

export type ScrollyItemProps = {
	overlay?: boolean
	title: string
	link: string
	content: string
	asset: string
	image: MediaProps
}

export type ScrollyProps = {
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
