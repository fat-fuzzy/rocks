import type {UiAssetType} from '@fat-fuzzy/ui'

export type NavItem = {
	slug: string
	title: string
	label: string
	asset?: string
	assetType?: UiAssetType
	formaction?: string
	actionPath?: string
	layout?: string
	items?: NavItem[]
	url?: URL
}
