import {defineEnvVars} from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_DOC_LANGUAGE: {public: true, static: true},
	PUBLIC_DOC_FORMAT: {public: true, static: true},
})
