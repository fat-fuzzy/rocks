import type {UiBlockProps} from '$types'

export type PopoverProps = UiBlockProps & {
	id: string
	children: Snippet
}
