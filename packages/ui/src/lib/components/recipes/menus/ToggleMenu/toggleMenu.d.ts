import type {UiBlockProps, FuzzyPayload, ToggleProps} from '$types'
import {UiState} from '$types'

export type ToggleMenuProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string
	title?: string
	mode?: string
	disabled?: boolean | undefined
	formaction?: string
	items: ToggleProps[]
	init: (
		payload: {name: string; value?: string | number; state: string}[],
	) => void
	onupdate: (
		payload: {name: string; value?: string | number; state: string}[],
	) => void
}
