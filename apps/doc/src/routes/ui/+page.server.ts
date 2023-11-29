import type {Actions} from './$types'
import {fail, redirect} from '@sveltejs/kit'

import {constants, forms, stores} from '@fat-fuzzy/ui'

const {StylesUpdate, StylesContextReveal} = forms
const {DEFAULT_STYLES} = constants
const {ui} = stores

const {DEFAULT_REVEAL_STATE} = constants

export const actions = {
	toggleContext: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-ui-context-reveal')
		let currentState = DEFAULT_REVEAL_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		let settingsReveal = new StylesContextReveal(currentState)
		if (!settingsReveal.reveal(data)) {
			return fail(400, {settingsRevealError: true})
		}
		ui.reveal.set(settingsReveal.settings)
		cookies.set('fat-fuzzy-ui-context-reveal', settingsReveal.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			throw redirect(303, redirectTo)
		}
		return {success: true}
	},

	updateStyles: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('fat-fuzzy-ui')
		let currentStyles = DEFAULT_STYLES
		if (serialized) {
			currentStyles = JSON.parse(serialized)
		}
		const styles = new StylesUpdate(currentStyles)
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
