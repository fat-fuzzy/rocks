import type {Handle} from '@sveltejs/kit'

export const handle = (async ({event, resolve}) => {
	const styles = await Promise.resolve(event.cookies.get('fat-fuzzy-ui'))
	const settingsReveal = await Promise.resolve(event.cookies.get('fat-fuzzy-settings-reveal'))
	const appSettings = await Promise.resolve(event.cookies.get('fat-fuzzy-settings-app'))
	if (styles) {
		event.locals.styles = styles
	}
	if (settingsReveal) {
		event.locals.settings = settingsReveal
	}
	if (appSettings) {
		event.locals.app = appSettings
	}

	const response = await resolve(event)
	return response
}) satisfies Handle
