import {describe, expect, test} from 'vitest'

import {APP_NAME} from '#config/setup.js'
import {LOCALIZATIONS} from '#lib/intl/l10n.js'
import {
	getCtaFromRouteId,
	getDescriptionForRoute,
	getNamespaceFromRoute,
	getNamespaces,
	getPrefixForRoute,
	getRouteLabelsForNamespace,
	getRouteNameFromRouteId,
	getRouteNamesForNamespace,
	getTitleForRoute,
} from '#lib/common/routing.js'

/**
 * NOTE: `any` types are used for testing purposes and are therefore ignored
 */
describe('routing.ts - route and namespace helpers', () => {
	test('getNamespaces returns namespace metadata with localized titles', () => {
		expect(getNamespaces()).toEqual([
			{name: 'chlorophyll', title: 'Chlorophyll'},
			{name: 'pollen', title: 'Pollen'},
		])
	})

	test('getNamespaceFromRoute resolves valid namespace IDs and throws for unknown routes', () => {
		expect(getNamespaceFromRoute('/chlorophyll/edit')).toBe('chlorophyll')
		expect(getNamespaceFromRoute('/pollen/reflect')).toBe('pollen')
		// @ts-expect-error wrong type is used for test
		expect(() => getNamespaceFromRoute('/unknown/route')).toThrow(
			'Namespace for route not available',
		)
	})

	test('getRouteNameFromRouteId resolves route names and namespace roots', () => {
		expect(getRouteNameFromRouteId('/chlorophyll/edit')).toBe('edit')
		expect(getRouteNameFromRouteId('/pollen')).toBe('pollen')
		expect(getRouteNameFromRouteId('/pollen/missing')).toBeUndefined()
		expect(() => getRouteNameFromRouteId('/unknown')).toThrow(
			'Namespace for route not available',
		)
	})

	test('getCtaFromRouteId resolves known routes and throws when the route is missing', () => {
		expect(getCtaFromRouteId('/chlorophyll/compare')).toBe('compare')
		expect(getCtaFromRouteId('/pollen/write')).toBe('write')
		expect(() => getCtaFromRouteId('/chlorophyll/missing')).toThrow(
			'Route not found for namespace',
		)
	})

	test('getRouteNamesForNamespace returns names for valid namespaces and undefined for invalid ones', () => {
		expect(getRouteNamesForNamespace('chlorophyll')).toEqual([
			'edit',
			'build',
			'compare',
			'preview',
		])
		expect(getRouteNamesForNamespace('pollen')).toEqual([
			'write',
			'reflect',
			'explore',
		])

		// eslint-disable-next-line
		expect(getRouteNamesForNamespace('unknown' as any)).toBeUndefined()
	})

	test('getRouteLabelsForNamespace maps route names to label text and falls back cleanly for invalid namespaces', () => {
		expect(getRouteLabelsForNamespace('chlorophyll')).toMatchObject({
			edit: 'Edit',
			build: 'Build',
			compare: 'Compare',
			preview: 'Preview',
		})

		// eslint-disable-next-line
		expect(getRouteLabelsForNamespace('unknown' as any)).toEqual({})
	})

	test('getTitleForRoute and getDescriptionForRoute provide the localized route metadata', () => {
		expect(getTitleForRoute('edit')).toBe('Content')
		expect(getTitleForRoute('compare')).toBe('Compare')
		expect(getDescriptionForRoute('edit')).toBe('Create and edit content.')
		expect(getDescriptionForRoute('write')).toBe('')
	})

	test('getPrefixForRoute uses the app name by default and the localization cv value for preview', () => {
		expect(getPrefixForRoute()).toBe(`${APP_NAME} | `)
		expect(getPrefixForRoute('preview')).toBe(LOCALIZATIONS.en.cv)
	})
})
