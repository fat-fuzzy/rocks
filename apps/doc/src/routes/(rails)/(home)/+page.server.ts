import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import images from '$data/images'
import {commonActions} from '#lib/server/actions/page-actions.js'

const page = 'home'

type Asset = {
	title: string
	link: string
	content: string
	asset?: string
	image?: string
	json?: object
}

type PageAssets = {
	slug: string
	name: string
	count: number
	sections: Asset[]
}

const pageAssets: PageAssets = {
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
			title: 'About',
			link: 'about',
			content: '',
			image: undefined,
		},
		{
			title: 'UI',
			link: 'ui',
			content: '',
			image: undefined,
		},
		{
			title: 'Blog',
			link: 'blog',
			content: '',
			image: undefined,
		},
		{
			title: 'Play',
			link: 'play',
			content: '',
			image: undefined,
		},
	],
}

async function loadSectionsContent(pageAssets: PageAssets) {
	const assetPromises = []
	for (let i = 0; i < pageAssets.count; i++) {
		assetPromises.push(
			images.getImageData('home', `${pageAssets.slug}-${i + 1}`),
		)
	}
	const assets = await Promise.all(assetPromises)
	assets.forEach((asset, index) => {
		if (asset) {
			pageAssets.sections[index].image = {
				src: `/${asset.json.path}/${pageAssets.name}-${index + 1}`,
				...asset.json,
				sources: asset.json.sources,
			}
		}
	})
	return pageAssets.sections
}

export const load = async () => {
	try {
		const content = await pages.fetchMarkdowns(page)
		const sections = await loadSectionsContent(pageAssets)

		return {
			content: content.length ? content[0] : {meta: {title: ''}},
			sections,
		}
	} catch {
		error(500, 'There was an error when loading the page')
	}
}

export const actions = commonActions
