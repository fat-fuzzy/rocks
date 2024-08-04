import {error} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

const {NavReveal, SidebarReveal, SettingsReveal, SettingsUpdate} = ui.forms
const {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} = ui.constants

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
			error(500, 'navRevealError')
		}
		cookies.set('fat-fuzzy-nav-reveal', navReveal.toString(), {path: '/'})
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
			error(500, 'sidebarRevealError')
		}
		cookies.set('fat-fuzzy-sidebar-reveal', sidebarReveal.toString(), {
			path: '/',
		})
		return {status: 200}
	},

	toggleSubnav: async ({request, url, cookies}) => {
		const data = await request.formData()
		const name = data.get('name')
		const cookie = `fat-fuzzy-${name}`
		const serialized = cookies.get(cookie)
		let currentState = DEFAULT_REVEAL_STATE

		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		let navReveal = new NavReveal(currentState)
		if (!navReveal.reveal(data)) {
			error(500, 'subnavRevealError')
		}
		cookies.set(cookie, navReveal.toString(), {path: '/'})
		return {status: 200}
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
			error(500, 'settingsRevealError')
		}
		cookies.set('fat-fuzzy-settings-reveal', settingsReveal.toString(), {
			path: '/',
		})
		return {status: 200}
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
			error(500, 'settingsError')
		}
		cookies.set('fat-fuzzy-settings-app', settingsUpdate.toString(), {
			path: '/',
		})
		return {status: 200}
	},

	reset: async ({cookies}) => {
		cookies.getAll().forEach((cookie) => {
			if (cookie.name.startsWith('fat-fuzzy-')) {
				cookies.delete(cookie.name, {path: '/'})
			}
		})
	},
}
