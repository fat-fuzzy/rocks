import type {Actions} from './$types'
import {fail, redirect} from '@sveltejs/kit'
import {Styles} from '$lib/forms/styles-update'
import {DEFAULT_STYLES} from '$lib/api/styles/styles-api'
import * as ui from '$stores/ui'

export const actions = {
	updateStyles: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-ui')
		let currentStyles = DEFAULT_STYLES
		if (serialized) {
			currentStyles = JSON.parse(serialized)
		}
		const styles = new Styles(currentStyles)
		if (!styles.enter(data)) {
			return fail(400, {stylesError: true})
		}
		ui.styles.set(styles.api.getStyleTree())
		cookies.set('fat-fuzzy-ui', styles.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}

		return {success: true}
	},

	restart: async ({cookies, url}) => {
		cookies.delete('fat-fuzzy-ui', {path: '/'})
	},
} satisfies Actions
