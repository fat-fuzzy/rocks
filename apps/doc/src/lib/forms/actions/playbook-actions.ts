import {fail} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'
import playbook from '@fat-fuzzy/playbook'
import uiStateService from '$lib/forms/services/ui-state.js'

const {DsStateUpdate, DsStylesUpdate} = playbook.actions
const {SignUpUser} = ui.forms
const {APP_PREFIX} = ui.constants

export const playbookActions = {
	updateState: async ({request, cookies}) => {
		const data = await request.formData()
		if (data.has('reset')) {
		}
		const key = `${APP_PREFIX}-ui-state`

		const cookieValue = uiStateService.getUiState({
			cookies,
			key,
		})
		let currentState =
			typeof cookieValue === 'string' ? JSON.parse(cookieValue) : cookieValue
		const toUpdate = new DsStateUpdate(currentState)

		if (!toUpdate.enter(data)) {
			fail(400, {stylesError: true})
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: toUpdate.toString(), // TODO : understand why stringify(stringify(object)) passes size constraints while stringify(object) fails
			options: {
				host: 'localhost', // TODO: fix domain
				path: '/',
			},
		})
		return {success: true}
	},

	updateStyles: async ({request, cookies}) => {
		const data = await request.formData()
		const key = `${APP_PREFIX}-ui-styles`
		const cookieValue = uiStateService.getUiState({
			cookies,
			key,
		})
		let currentStyles =
			typeof cookieValue === 'string' ? JSON.parse(cookieValue) : cookieValue
		const styles = new DsStylesUpdate(currentStyles)
		if (!styles.enter(data)) {
			fail(400, {stylesError: true})
		}
		uiStateService.setUiState({
			cookies,
			key,
			value: styles.toString(), // TODO : understand why stringify(stringify(object)) passes size constraints while stringify(object) fails
			options: {
				host: 'localhost', // TODO: fix domain
				path: '/',
			},
		})
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
}
