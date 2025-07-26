import type {UiActionSetInput, UiActionSetOutput} from '$lib/types/actions.js'
import {error} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

import uiStateService from '$lib/forms/services/session.js'

const {
	APP_PREFIX,
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_SIDEBAR_REVEAL_STATE,
} = ui.constants
const {UiReveal} = ui.forms

async function handleToggleUiReveal({
	event,
	element,
	options,
}: UiActionSetInput): Promise<UiActionSetOutput> {
	const {request, cookies} = event

	const data = await request.formData()

	if (!element) {
		error(500, `Cannot toggle ${element} element`)
	}

	const key = `${APP_PREFIX}-reveal-${element}`
	const currentState = uiStateService.getUiState({
		cookies,
		key,
	})

	if (!currentState.reveal) {
		currentState.reveal = options?.state?.reveal
	}

	try {
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
				path: '/',
			},
		})
		return {
			success: true,
			key,
			state: newState.state,
		}
	} catch (error) {
		return {
			success: false,
			type: element,
			message: 'Failed to update UI', // TODO: improve / manage error message with intl package,
		}
	}
}

async function handleToggleSidebar(event) {
	const element = 'sidebar'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_SIDEBAR_REVEAL_STATE,
		},
	})
}

async function handleToggleAppContext(event) {
	const element = 'appContext'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleNav(event) {
	const element = 'nav'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_NAV_REVEAL_STATE,
		},
	})
}

async function handleToggleTokens(event) {
	const element = 'tokens'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleBlocks(event) {
	const element = 'blocks'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleLayouts(event) {
	const element = 'layouts'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleRecipes(event) {
	const element = 'recipes'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleTogglePageContext(event) {
	const element = 'pageContext'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleUsage(event) {
	const element = 'usage'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleDecisions(event) {
	const element = 'decisions'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleLearning(event) {
	const element = 'learning'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleProjects(event) {
	const element = 'projects'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

export default {
	handleToggleSidebar,
	handleToggleNav,
	handleToggleAppContext,
	handleToggleTokens,
	handleToggleBlocks,
	handleToggleLayouts,
	handleToggleRecipes,
	handleTogglePageContext,
	handleToggleUsage,
	handleToggleDecisions,
	handleToggleLearning,
	handleToggleProjects,
}
