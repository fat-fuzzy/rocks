import {defineEnvVars} from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_DOCUMENT_LANGUAGE: {public: true, static: true},
	PUBLIC_DOCUMENT_FORMAT: {public: true, static: true},
})
