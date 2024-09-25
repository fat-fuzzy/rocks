import type {Snippet} from 'svelte'
import {PictureProps} from '$types'

type ScrollyItemProps = PictureProps & {
	overlay?: boolean
	content?: {title: string; link: string; content: string}
}
