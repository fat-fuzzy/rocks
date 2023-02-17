import type {Handle} from '@sveltejs/kit'

export const handle = (async ({event, resolve}) => {
	const serialized = await Promise.resolve(event.cookies.get('fat-fuzzy-ui'))
	if (serialized) {
		event.locals.uiStateData = serialized
	}
	const response = await resolve(event)
	return response
}) satisfies Handle
