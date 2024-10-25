import {error, redirect} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'
import pages from '$data/pages'
import images from '$data/images'

const page = 'home'

const {UiReveal, SettingsUpdate} = ui.forms
const {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} = ui.constants

const pageAssets = {
	slug: 'fat-fuzzy',
	name: 'Fat-Fuzzy',
	count: 5,
	sections: [
		{
			title: 'Contents ✨',
			link: '',
			content: '',
			asset: 'sparkles',
			image: undefined,
		},
		{
			title: 'Doc',
			link: 'doc',
			content: '',
			asset: 'usage',
			image: undefined,
		},
		{
			title: 'UI',
			link: 'ui',
			content: '',
			asset: 'recipes',
			image: undefined,
		},
		{
			title: 'Blog',
			link: 'blog',
			content: '',
			asset: 'default',
			image: undefined,
		},
		{
			title: 'Play',
			link: 'play',
			content: '',
			asset: 'rainbow',
			image: undefined,
		},
	],
}

async function loadSectionsContent(pageAssets) {
	const assetPromises: Promise<any>[] = []
	for (let i = 0; i < pageAssets.count; i++) {
		assetPromises.push(
			images.getImageData('home', `${pageAssets.slug}-${i + 1}`),
		)
	}
	const assets = await Promise.all(assetPromises)
	assets.forEach((asset, index) => {
		pageAssets.sections[index].image = {
			src: `/${asset.json.path}/${pageAssets.name}-${index + 1}`,
			...asset.json,
			sources: asset.json.sources,
		}
	})
	return pageAssets.sections
}

export const load = async ({params}) => {
	try {
		const content = await pages.fetchMarkdowns(page)
		const sections = await loadSectionsContent(pageAssets)
		return {
			content: content.length ? content[0] : {meta: {title: ''}},
			sections,
		}
	} catch (e) {
		error(500, 'Error loading image data')
	}
}

export const actions = {
	toggleNav: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-nav-reveal')
		let currentState = DEFAULT_REVEAL_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}

		let navReveal = new UiReveal(currentState)
		if (!navReveal.reveal(data)) {
			error(500, 'navRevealError')
		}
		cookies.set('fat-fuzzy-nav-reveal', navReveal.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
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
		let sidebarReveal = new UiReveal(currentState)
		if (!sidebarReveal.reveal(data)) {
			error(500, 'sidebarRevealError')
		}
		cookies.set('fat-fuzzy-sidebar-reveal', sidebarReveal.toString(), {
			path: '/',
		})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}
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
		let navReveal = new UiReveal(currentState)
		if (!navReveal.reveal(data)) {
			error(500, 'subnavRevealError')
		}
		cookies.set(cookie, navReveal.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}
		return {status: 200}
	},

	toggleSettings: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-settings-reveal')
		let currentState = DEFAULT_REVEAL_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		let settingsReveal = new UiReveal(currentState)
		if (!settingsReveal.reveal(data)) {
			error(500, 'settingsRevealError')
		}
		cookies.set('fat-fuzzy-settings-reveal', settingsReveal.toString(), {
			path: '/',
		})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}
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
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}
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
