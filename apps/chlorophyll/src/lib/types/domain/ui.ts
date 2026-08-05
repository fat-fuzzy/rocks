import type {Snippet} from 'svelte'
import type {UiSize, UiColor, UiVariant, UiShape} from '@fat-fuzzy/ui'
import type {Slug, Uuid} from '$types'

export type MenuItem = {
	id: Slug
	name: Slug
	value: Slug
	label: string // menu item label
	title: string // page title
}

export type InputCheckedTypes = 'radio' | 'checkbox'

export type InputGroupMenus = {[name: string]: MenuItem[]}

export type DialogState =
	| 'idle'
	| 'loading'
	| 'visible'
	| 'closed'
	| 'cancelled'

export type ImportStatus =
	| 'idle'
	| 'deleting'
	| 'backing-up'
	| 'ready'
	| 'importing'
	| 'done'
	| 'error'

export type DialogProps = {
	labelId?: string // Use as form id if using autofocus to focus on the first input (fixes accessibility issues: https://brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/)
	label?: string
	modal?: boolean
	variant?: UiVariant
	color?: UiColor
	size?: UiSize
	shape?: UiShape
	position?: string
	justify?: string
	level?: number
	children?: Snippet
	cta?: string
	message?: string
	onSubmit?: () => void
	onClose?: () => void
}

export interface TagProps {
	name: Slug
	group?: Slug
	groupTitle?: string
	type?: string // 'radio' or undefined
}

export type BlockProps = {
	name: Slug
	id?: Uuid
	title?: string
	rank?: number
	group?: Slug
	parent: Slug
	tags: Slug[]
}
