import type {SeedDocument} from '$types'

import cvParser from '$data/cv/cv-io-markdown'

export const prerender = true

export const load = async () => {
	// Initial seed formats
	const seedMetadata = await cvParser.parseMarkdownCvSeed()

	if (!seedMetadata) {
		return
	}

	const contentPromises: Promise<SeedDocument | void>[] = []

	const {languages, formats} = seedMetadata

	const structures = await cvParser.parseMarkdownCvMeta({
		formats,
	})

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
		seed: {content, structures},
	}
}
