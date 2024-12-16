import type {UiActionSetInput} from '$lib/types/actions.js'
import {error, fail} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

import uiStateService from '$lib/forms/services/ui-state.js'
import UiReveal from '$lib/forms/services/ui-reveal.js'

const {APP_PREFIX} = ui.constants
/**
 * TODO validate input
 */
async function handleToggleUiReveal({
	event,
	element,
	options,
}: UiActionSetInput) {
	const {request, cookies} = event

	try {
		const data = await request.formData()

		if (!element) {
			error(500, `Cannot toggle ${element} element`)
		}

		const key = `${APP_PREFIX}-reveal-${element}`
		const currentState = uiStateService.getUiState({
			cookies,
			key,
		})

		const reveal = new UiReveal(currentState, element)
		const newState = reveal.reveal(data)

		if (!newState.success) {
			error(500, `Failed to toggle ${key}`)
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: newState.state,
			options: {
				host: options?.domain,
				path: '/',
			},
		})

		return {
			success: true,
			key,
			state: newState.state,
		}
	} catch (error) {
		console.error(error)
		return fail(500, {
			success: false,
			type: element,
			error: 'Failed to update UI state', // TODO: improve / manage error message with intl package
		})
	}
}

async function handleToggleSidebar(event) {
	const element = 'sidebar'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleSettings(event) {
	const element = 'settings'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleNav(event) {
	const element = 'nav'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleTokens(event) {
	const element = 'tokens'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleBlocks(event) {
	const element = 'blocks'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleLayouts(event) {
	const element = 'layouts'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleRecipes(event) {
	const element = 'recipes'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleUsage(event) {
	const element = 'usage'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleDecisions(event) {
	const element = 'decisions'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleLearning(event) {
	const element = 'learning'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

async function handleToggleProjects(event) {
	const element = 'projects'
	return handleToggleUiReveal({
		event,
		element,
		options: {},
	})
}

export default {
	handleToggleSidebar,
	handleToggleNav,
	handleToggleSettings,
	handleToggleTokens,
	handleToggleBlocks,
	handleToggleLayouts,
	handleToggleRecipes,
	handleToggleUsage,
	handleToggleDecisions,
	handleToggleLearning,
	handleToggleProjects,
}
