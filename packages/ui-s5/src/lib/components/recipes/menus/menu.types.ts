import {type UiBlockProps} from '$types/index.js'
import type {ButtonProps} from '$lib/components/blocks/buttons/button.types.js'
import type {RevealLayoutProps} from '$lib/components/layouts/layout.types.js'

export type ButtonMenuProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string
	title?: string
	mode?: string
	disabled?: boolean | undefined
	formaction?: string
	items: ButtonProps[]
	onupdate?: (payload: {name: string; value: string | number}) => void
}

export type RevealMenuProps = RevealLayoutProps & {
	items: any[]
	onclick?: (event: MouseEvent, payload: any) => void // TODO: type this
}
