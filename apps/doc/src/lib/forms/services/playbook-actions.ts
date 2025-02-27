import {fail} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'
import {forms} from '@fat-fuzzy/playbook'
import uiStateService from '$lib/forms/services/ui-state.js'

const {DsStateUpdate, DsStylesUpdate} = forms
const {SignUpUser} = ui.forms
const {APP_PREFIX} = ui.constants

export const playbookActions = {
	updateState: async ({request, cookies, locals}) => {
		const data = await request.formData()
		if (data.has('reset')) {
		}
		const key = `${APP_PREFIX}-ui-state`

		const currentState = uiStateService.getUiState({
			cookies,
			key,
		})
		const toUpdate = new DsStateUpdate(currentState)

		if (!toUpdate.enter(data)) {
			fail(400, {stylesError: true})
		}

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
		return {success: true}
	},

	updateStyles: async ({request, locals, cookies}) => {
		const data = await request.formData()
		const key = `${APP_PREFIX}-ui-state`
		const currentStyles = uiStateService.getUiState({
			cookies,
			key,
		})
		const styles = new DsStylesUpdate(currentStyles)
		if (!styles.enter(data)) {
			return fail(400, {stylesError: true})
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: styles.toString(),
			options: {
				host: 'localhost', // TODO: fix domain
				path: '/',
			},
		})
		locals.dsState = styles

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
