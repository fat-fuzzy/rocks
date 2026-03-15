import type {
	UiColor,
	UiContainer,
	UiLayout,
	UiSize,
	UiStatus,
	UiVariant,
} from '@fat-fuzzy/ui'

import type {IPlaybookFamily} from '$types'

export type StateInputOptions = {
	id: string
	asset?: string
	assetType?: string
	size?: UiSize
	label?: string
	text?: string
	value: string
	brightness?: string
	contrast?: string
	app?: string
	container?: UiContainer
	content?: string
	breakpoint?: UiSize
	threshold?: UiSize
	variant?: UiVariant
	color?: UiColor
	layout?: UiLayout
	status?: UiStatus
}

export interface StateCategory {
	name: string
	families: {[key: string]: IPlaybookFamily}
}
export interface AppState extends StateCategory {
	name: 'app'
	families: {config: IPlaybookFamily}
}

export interface StateOptions {
	app: AppState
}
