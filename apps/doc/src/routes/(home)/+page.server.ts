import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import images from '$data/images'
import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

const page = 'home'

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

export const load = async ({params, locals}) => {
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
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	updateSettings: async (event) =>
		settingsActions.handleToggleAppSettings({event}),
	reset: async ({cookies}) => {
		cookies.getAll().forEach((cookie) => {
			if (cookie.name.startsWith('fat-fuzzy-')) {
				cookies.delete(cookie.name, {path: '/'})
			}
		})
	},
}
