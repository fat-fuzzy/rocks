import type {RequestEvent} from '@sveltejs/kit'
import {fail} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'
import playbook from '@fat-fuzzy/playbook'
import uiStateService from '$lib/forms/services/session.js'

const {DsStateUpdate, DsStylesUpdate} = playbook.actions
const {SignUpUser} = ui.forms
const {APP_PREFIX} = ui.constants

export const playbookActions = {
	updateState: async ({request, cookies, locals}: RequestEvent) => {
		const data = await request.formData()
		if (data.has('reset')) {
		}
		const key = `${APP_PREFIX}-ui-state`

		const cookieValue = uiStateService.getUiState({
			cookies,
			key,
		})
		const toUpdate = new DsStateUpdate(cookieValue)

		if (!toUpdate.enter(data)) {
			fail(400, {stylesError: true})
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: toUpdate.state,
			options: {
				path: '/',
			},
		})
		locals.dsState = toUpdate.state
		return {success: true}
	},

	updateStyles: async ({request, cookies, locals}: RequestEvent) => {
		const data = await request.formData()
		const key = `${APP_PREFIX}-ui-styles`
		const cookieValue = uiStateService.getUiState({
			cookies,
			key,
		})
		const styles = new DsStylesUpdate(cookieValue)
		if (!styles.enter(data)) {
			fail(400, {stylesError: true})
		}
		uiStateService.setUiState({
			cookies,
			key,
			value: styles.api.getStyleTree(),
			options: {
				path: '/',
			},
		})
		locals.dsStyles = styles.api.getStyleTree()

		return {success: true}
	},

	signup: async ({request}: RequestEvent) => {
		const data = await request.formData()
		const signupUser = new SignUpUser()
		if (!signupUser.signup(data)) {
			fail(400, {signupUser: true})
		}

		return {success: true}
	},
}
