import {defineEnvVars} from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	DOCUMENT_LANGUAGE: {public: true, static: true},
	DOCUMENT_FORMAT: {public: true, static: true},
})
