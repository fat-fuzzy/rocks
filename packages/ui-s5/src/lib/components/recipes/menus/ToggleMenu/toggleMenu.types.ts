import {UiState, type UiBlockProps} from '$types/index.js'
import type {
	TogglePayload,
	ToggleProps,
} from '$lib/components/blocks/buttons/Toggle/toggle.types.js'

export type ToggleState = UiState.active | UiState.inactive

export type ToggleMenuPayload = TogglePayload | TogglePayload[]

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
	onload: (
		payload: {name: string; value: string | number; state: string}[],
	) => void
	onupdate: (
		payload: {name: string; value: string | number; state: string}[],
	) => void
}

export type ToggleMenuStateType = Map<string, TogglePayload>
