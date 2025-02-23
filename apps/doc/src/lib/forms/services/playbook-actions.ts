import type {Actions} from './$types'
import {fail, redirect} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'
import {forms} from '@fat-fuzzy/playbook'
import uiStateService from '$lib/forms/services/ui-state.js'

const {DsStateUpdate, DsStylesUpdate} = forms
const {SignUpUser} = ui.forms
const {DEFAULT_STYLES, APP_PREFIX} = ui.constants

export const playbookActions = {
	updateState: async ({request, url, cookies, locals}) => {
		const data = await request.formData()
		if (data.has('reset')) {
		}
		const key = `${APP_PREFIX}-ui-state`
		const currentState = uiStateService.getUiState({
			cookies,
			key,
		})

		console.log('currentState', currentState)
		const toUpdate = new DsStateUpdate(currentState)

		if (!toUpdate.enter(data)) {
			fail(400, {stylesError: true})
		}

		console.log('toUpdate', toUpdate)
		uiStateService.setUiState({
			cookies,
			key,
			value: toUpdate.state,
			options: {
				host: 'localhost', // TODO: fix domain
				path: '/',
			},
		})
		locals.dsState = toUpdate.state
		console.log('locals.dsState ', locals.dsState)
		return {success: true}
	},

	updateStyles: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('ff-ui-styles')
		let currentStyles = DEFAULT_STYLES
		if (serialized) {
			currentStyles = JSON.parse(serialized)
		}
		const styles = new DsStylesUpdate(currentStyles)
		if (!styles.enter(data)) {
			return fail(400, {stylesError: true})
		}

		return {success: true}
	},

	signup: async ({request, url, cookies}) => {
		const data = await request.formData()
		const signupUser = new SignUpUser()
		if (!signupUser.signup(data)) {
			return fail(400, {signupUser: true})
		}

		return {success: true}
	},
} satisfies Actions
