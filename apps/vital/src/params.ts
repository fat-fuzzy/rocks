import {defineParams} from '@sveltejs/kit/params'
import {matchChlorophyll} from './lib/params/chlorophyll_cta.ts'
import {matchMycelium} from './lib/params/mycelium_cta.ts'
import {matchPollen} from './lib/params/pollen_cta.ts'

export const params = defineParams({
	chlorophyll_cta: matchChlorophyll,
	mycelium_cta: matchMycelium,
	pollen_cta: matchPollen,
})
