import type {
	UiColor,
	UiContainer,
	UiLayout,
	UiSize,
	UiStatus,
	UiVariant,
} from '@fat-fuzzy/ui'

// TODO: figure out if I can extract this info from Svelte component
interface IPlaybookInputOptions {
	id: string
	value: string
	[key: string]: string
}

export type PlaybookInputOptions = {
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

export interface InputCategory {
	name: string
	families: {[key: string]: IPlaybookFamily}
}

/**
 * IPlaybookInputSet is used to generate the UI to set a style value in the UI library doc
 */
export interface IPlaybookInputSet {
	id: string
	name: string

	layout?: UiLayout
	container?: UiContainer
	breakpoint?: UiSize
	threshold?: UiSize
	size?: UiSize
	variant?: UiVariant
	mode?: string
	assetType?: string
}

export interface IPlaybookInputGroup extends IPlaybookInputSet {
	slug: string
	input: string
	value: string
	items: Array<IPlaybookInputOptions>

	getValue: () => string
	setValue: (value: string) => void
}

export interface IPlaybookFamily extends IPlaybookInputSet {
	/**
	 * A IPlaybookFamily provides form inputs for related styles that apply to a single InputCategory
	 */
	items: Array<IPlaybookInputGroup>
	itemsMap: Map<string, IPlaybookInputGroup>
}

export type PlaybookInputSetOptions = {
	id: string
	name: string
	layout?: UiLayout
	container?: UiContainer
	breakpoint?: UiSize
	threshold?: UiSize
	size?: UiSize
	variant?: UiVariant
	mode?: string
	assetType?: string
}

export type PlaybookInputGroupOptions = PlaybookInputSetOptions & {
	input: string
	value: string
	items: Array<IPlaybookInputOptions>
}

export type PlaybookFamilyOptions = PlaybookInputSetOptions & {
	title: string
	items: Array<IPlaybookInputGroup>
}
