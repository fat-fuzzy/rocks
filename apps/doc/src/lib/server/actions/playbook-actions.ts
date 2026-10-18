import type {RequestEvent} from '@sveltejs/kit'
import {fail} from '@sveltejs/kit'

import {SignUpUser} from '@fat-fuzzy/ui'
import config from '#config/setup.js'
import playbook from '@fat-fuzzy/playbook'
import uiStateService from '#lib/server/services/session.js'

const {DsStylesUpdate} = playbook.actions
const {APP_PREFIX} = config

export const playbookActions = {
	updateStyles: async ({request, cookies, locals}: RequestEvent) => {
		const data = await request.formData()
		const key = `${APP_PREFIX}-ui-styles`
		const cookieValue = uiStateService.getUiState({
			cookies,
			key,
		})

		// FIXME: use schema for this
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
