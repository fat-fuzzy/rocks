import type {SeedDoc} from '$types'

import {error} from '@sveltejs/kit'

import cvParser from '$data/cv/cv-io-markdown'

export const prerender = true

export const load = async () => {
	// Initial seed formats
	const seedMetadata = await cvParser.parseMarkdownCvSeed()

	if (!seedMetadata) {
		return
	}

	const contentPromises: Promise<SeedDoc | void>[] = []

	const {languages, formats} = seedMetadata

	if (!languages || !formats) {
		error(404, {message: 'Not found'})
	}

	const structures = await cvParser.parseMarkdownCvMeta({
		formats,
	})

	const metadata = await cvParser.parseMarkdownCvMeta({
		formats,
	})

	if (!structures?.base || !structures?.structures) {
		error(404, {message: 'Not found'})
	}

	for (const language of languages) {
		for (const format of formats) {
			contentPromises.push(
				cvParser.parseMarkdownCvContent({
					language,
					format,
				}),
			)
		}
	}

	const content = await Promise.all(contentPromises)

	return {
		...metadata,
		seed: {content, structures},
	}
}
