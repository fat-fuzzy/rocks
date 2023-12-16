import type {Actions} from './$types'
import {fail, redirect} from '@sveltejs/kit'
import {DsTabsUpdate} from '$lib/forms/ds-tabs-update'
import {DsStateUpdate} from '$lib/forms/ds-state-update'
import {DsStylesUpdate} from '$lib/forms/ds-styles-update'
import {DsContextReveal} from '$lib/forms/ds-context-reveal'
import constants from '$lib/types/constants'

const {DEFAULT_REVEAL_STATE, DEFAULT_STYLES, DEFAULT_DS_STATE, UI_DOC_TABS} = constants

export const actions = {
	toggleContext: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-ui-context-reveal')
		let currentState = DEFAULT_REVEAL_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		let settingsReveal = new DsContextReveal(currentState)
		if (!settingsReveal.reveal(data)) {
			return fail(400, {settingsRevealError: true})
		}
		cookies.set('fat-fuzzy-ui-context-reveal', settingsReveal.toString(), {
			path: '/',
		})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}
		return {success: true}
	},

	updateState: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-ui-state')
		let currentState = DEFAULT_DS_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		const state = new DsStateUpdate(currentState)
		if (!state.enter(data)) {
			return fail(400, {stylesError: true})
		}
		cookies.set('fat-fuzzy-ui-state', state.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}

		return {success: true}
	},

	updateStyles: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-ui-styles')
		let currentStyles = DEFAULT_STYLES
		if (serialized) {
			currentStyles = JSON.parse(serialized)
		}
		const styles = new DsStylesUpdate(currentStyles)
		if (!styles.enter(data)) {
			return fail(400, {stylesError: true})
		}
		cookies.set('fat-fuzzy-ui-styles', styles.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}

		return {success: true}
	},

	handleTabChange: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-ui-tabs')
		let currentTab = UI_DOC_TABS[0]
		if (serialized) {
			currentTab = JSON.parse(serialized)
		}
		const tabs = new DsTabsUpdate(currentTab)
		if (!tabs.update(data)) {
			return fail(400, {tabsError: true})
		}
		cookies.set('fat-fuzzy-ui-tabs', tabs.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}

		return {success: true}
	},

	restart: async ({cookies, url}) => {
		cookies.delete('fat-fuzzy-ui-tabs', {path: '/'})
		cookies.delete('fat-fuzzy-ui-state', {path: '/'})
		cookies.delete('fat-fuzzy-ui-styles', {path: '/'})
		cookies.delete('fat-fuzzy-ui-context-reveal', {path: '/'})
	},
} satisfies Actions
