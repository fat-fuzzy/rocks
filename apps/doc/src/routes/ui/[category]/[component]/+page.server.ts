import type {PageServerLoad, Actions} from './$types'
import {fail} from '@sveltejs/kit'
import {Styles} from '$lib/forms/styles'
import {stores} from '@fat-fuzzy/ui'
const {ui} = stores

export const load = (async ({parent}) => {
	const styles = await parent()
	return styles
}) satisfies PageServerLoad

export const actions = {
	/**
	 * Modify styles state in reaction to a keypress. If client-side JavaScript
	 * is available, this will happen in the browser instead of here
	 */
	update: async ({request, cookies}) => {
		const styles = new Styles(ui.$currentStyles)
		const data = await request.formData()

		if (!styles.enter(data)) {
			return fail(400, {stylesError: true})
		}

		ui.currentStyles.set(styles.api.getStyleTree())
		cookies.set('fat-fuzzy-ui', styles.toString(), {path: '/'})

		return {success: true}
	},

	/**
	 * Modify styles state in reaction to a guessed word. This logic always runs on
	 * the server, so that people can't cheat by peeking at the JavaScript
	 */
	enter: async ({request, cookies}) => {
		const styles = new Styles(ui.$currentStyles)
		const data = await request.formData()

		if (!styles.enter(data)) {
			return fail(400, {stylesError: true})
		}

		ui.currentStyles.set(styles.api.getStyleTree())
		cookies.set('fat-fuzzy-ui', styles.toString(), {path: '/'})
		return {success: true}
	},

	restart: async ({cookies}) => {
		cookies.delete('fat-fuzzy-ui', {path: '/'})
	},
} satisfies Actions
