import type {Snippet} from 'svelte'
import type {UiBlockProps, UiLayoutProps} from '$types'
import {props} from '$types'

const {AriaInvoke} = props

export type OverlayProps = UiBlockProps &
	UiLayoutProps & {
		id: string
		role?: string // AriaRole
		title: string
		invoke?: typeof AriaInvoke
		open?: boolean
		fixed?: string
		children?: Snippet
		onbeforetoggle?: (payload: FuzzyPayload) => void
	}
