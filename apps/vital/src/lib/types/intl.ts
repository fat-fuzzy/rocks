import type {DocLanguage, NamespaceKey, RouteNameFor} from '$types'

export type Localizations = {
	[lang in DocLanguage]: {
		[key: string]: string
	}
}

export type LabelsForNamespace = {
	[key in NamespaceKey]?: string
}

export type LabelsForRoutes<N extends NamespaceKey> = {
	[key in RouteNameFor<N>]?: string
}
