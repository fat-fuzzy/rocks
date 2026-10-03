import {defineParams} from '@sveltejs/kit/params'
import {matchInteger} from '#lib/params/integer.ts'

export const params = defineParams({
	integer: matchInteger,
})
