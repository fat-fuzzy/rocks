import type {DocLanguage, DocFormat} from '$types'

import {error} from '@sveltejs/kit'

import cvParser from '$data/cv/cv-io-markdown'
import {PUBLIC_DOCUMENT_LANGUAGE, PUBLIC_DOCUMENT_FORMAT} from '$app/env/public'

// Cannot prerender page that uses url.searchParams
export const prerender = false

export const load = async ({url}) => {
	const language = url.searchParams.get('language') || PUBLIC_DOCUMENT_LANGUAGE
	const format = url.searchParams.get('format') || PUBLIC_DOCUMENT_FORMAT

	// Initial seed formats
	const seedMetadata = await cvParser.parseMarkdownCvSeed()

	if (!seedMetadata) {
		return
	}

	const {formats} = seedMetadata

	const metadata = await cvParser.parseMarkdownCvMeta({
		formats,
	})

	const content = await cvParser.parseMarkdownCvContent({
		language: language as DocLanguage,
		format: format as DocFormat,
	})

	if (!metadata?.base || !metadata?.structures) {
		error(404, {message: 'Not found'})
	}

	return {
		...metadata,
		content,
	}
}
