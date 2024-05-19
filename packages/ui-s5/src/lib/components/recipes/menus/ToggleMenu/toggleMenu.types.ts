import {UiState, type UiStyleProps} from '$types/index.js'
import type {
	TogglePayload,
	ToggleProps,
} from '$lib/components/blocks/buttons/Toggle/toggle.types.js'

export type SelectionMode = 'radio' | 'check'

export type ToggleState = UiState.active | UiState.inactive

export type ToggleMenuPayload = TogglePayload | TogglePayload[]

export type ToggleMenuProps = UiStyleProps & {
	/**
	 * State props
	 */
	id: string
	title?: string
	mode?: SelectionMode
	disabled?: boolean | undefined
	formaction?: string
	items: ToggleProps[]
	onupdate: (
		payload: {name: string; value: string | number; pressed?: boolean}[],
	) => void
}

export type ToggleMenuStateType = Map<string, TogglePayload>
