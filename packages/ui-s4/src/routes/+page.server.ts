import type {Actions} from './$types'
import {fail, redirect} from '@sveltejs/kit'
import {NavReveal} from '$lib/forms/nav-reveal'
import {SidebarReveal} from '$lib/forms/sidebar-reveal'
import {SettingsReveal} from '$lib/forms/settings-reveal'
import {SettingsUpdate} from '$lib/forms/settings-update'
import constants from '$lib/types/constants'

const {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} = constants

export const actions = {
	toggleNav: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-nav-reveal')
		let currentState = DEFAULT_REVEAL_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		let navReveal = new NavReveal(currentState)
		if (!navReveal.reveal(data)) {
			return fail(400, {navRevealError: true})
		}
		cookies.set('fat-fuzzy-nav-reveal', navReveal.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			redirect(303, redirectTo);
		}
		return {success: true}
	},

	toggleSidebar: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-sidebar-reveal')
		let currentState = DEFAULT_REVEAL_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		let sidebarReveal = new SidebarReveal(currentState)
		if (!sidebarReveal.reveal(data)) {
			return fail(400, {sidebarRevealError: true})
		}
		cookies.set('fat-fuzzy-sidebar-reveal', sidebarReveal.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			redirect(303, redirectTo);
		}
		return {success: true}
	},

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
		cookies.set('fat-fuzzy-settings-reveal', settingsReveal.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			redirect(303, redirectTo);
		}
		return {success: true}
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
		cookies.set('fat-fuzzy-settings-app', settingsUpdate.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			redirect(303, redirectTo);
		}
		return {success: true}
	},

	reset: async ({url, cookies}) => {
		cookies.delete('fat-fuzzy-nav-reveal', {path: url.pathname})
		cookies.delete('fat-fuzzy-settings-reveal', {path: url.pathname})
		cookies.delete('fat-fuzzy-sidebar-reveal', {path: url.pathname})
		cookies.delete('fat-fuzzy-settings-app', {path: url.pathname})
	},
} satisfies Actions
