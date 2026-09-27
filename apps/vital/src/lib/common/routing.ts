import {APP_NAME} from '$config/setup'

import {
	CTA_TO_LABEL,
	CTA_TO_TITLE,
	CTA_TO_DESCRIPTION,
	LOCALIZATIONS,
	NAMESPACE_TO_TITLE,
} from '$lib/intl/l10n'

import type {
	NamespaceId,
	NamespaceKey,
	RouteId,
	LabelsForRoutes,
	RouteNameFor,
	DocLanguage,
} from '$types'

import {NAMESPACES} from '$types'

export function getNamespaces(): {
	name: NamespaceId
	title?: string
}[] {
	return Object.values(NAMESPACES).map((n) => ({
		name: n.namespace,
		title: NAMESPACE_TO_TITLE[n.namespace],
	}))
}

export function getNamespaceFromRoute(id: RouteId): NamespaceId | undefined {
	const key = id.split('/')[1] as NamespaceKey

	if (NAMESPACES[key]) {
		return key
	}
}

export function getRouteNamesForNamespace(
	key: NamespaceKey,
): RouteNameFor<NamespaceKey>[] | undefined {
	const namespace = NAMESPACES[key]
	if (!namespace) {
		return
	}
	return namespace.children.map((r) => r.name)
}

export function getRouteLabelsForNamespace(
	key: NamespaceKey,
): LabelsForRoutes<NamespaceKey> {
	const namespace = NAMESPACES[key]
	if (!namespace) {
		return {}
	}

	const labels = namespace.children.reduce(
		(labels: LabelsForRoutes<NamespaceKey>, r) => {
			labels[r.name] = CTA_TO_LABEL[r.name]

			return labels
		},
		{},
	)

	return labels
}

export function getTitleForRoute(
	routeName: RouteNameFor<NamespaceKey>,
): string {
	return CTA_TO_TITLE[routeName] ?? ''
}

export function getDescriptionForRoute(
	routeName: RouteNameFor<NamespaceKey>,
): string {
	return CTA_TO_DESCRIPTION[routeName] ?? ''
}

export function getPrefixForRoute(
	language: DocLanguage,
	cta?: RouteNameFor<NamespaceId>,
) {
	return cta === 'preview' ? `${LOCALIZATIONS[language].cv}_` : `${APP_NAME} | `
}
