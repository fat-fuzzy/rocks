// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true
import type {ViewingPreferences} from '@fat-fuzzy/ui'

export const load = async ({locals}) => {
	// Main header nav
	const nav = locals.nav
	const appContext: ViewingPreferences = {
		brightness: 'system',
		contrast: 'contrast',
	}

	return {
		nav,
		appContext,
	}
}
