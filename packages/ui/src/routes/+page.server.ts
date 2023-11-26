import type {Actions} from './$types'
import {fail, redirect} from '@sveltejs/kit'
import {SettingsReveal} from '$lib/forms/settings-reveal'
import {SettingsUpdate} from '$lib/forms/settings-update'
import {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} from '$types/constants'
import * as settings from '$lib/stores/settings'

export const actions = {
	toggleSettings: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-settings-reveal')
		let currentState = DEFAULT_REVEAL_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		let settingsReveal = new SettingsReveal(currentState)
		if (!settingsReveal.reveal(data)) {
			return fail(400, {settingsRevealError: true})
		}
		settings.reveal.set(settingsReveal.settings)
		cookies.set('fat-fuzzy-settings-reveal', settingsReveal.toString(), {path: url.pathname})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}
	},

	updateSettings: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-settings-app')
		let currentSettings = DEFAULT_APP_SETTINGS
		if (serialized) {
			currentSettings = JSON.parse(serialized)
		}
		let settingsUpdate = new SettingsUpdate(currentSettings)
		if (!settingsUpdate.update(data)) {
			return fail(400, {settingsError: true})
		}
		settings.app.set(settingsUpdate.app)
		cookies.set('fat-fuzzy-settings-app', settingsUpdate.toString(), {path: url.pathname})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}
	},

	reset: async ({url, cookies}) => {
		cookies.delete('fat-fuzzy-settings-reveal', {path: url.pathname})
		cookies.delete('fat-fuzzy-settings-app', {path: url.pathname})
	},
} satisfies Actions
